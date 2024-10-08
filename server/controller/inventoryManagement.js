const {
    createItemInCatalogue,
    addItemToInventory,
    removeItemFromInventory,
    removeItemFromCatalogue,
    updateItemFromCatalogue,
    searchForItem
} = require('../modules/InventoryManager');
const { Item } = require('../data/sequelizeModels/Item');
const { Inventory } = require('../data/sequelizeModels/Inventory');
const { checkout } = require('../modules/Checkout');
const { OutOfStockError, PaymentError, InvalidCartError } = require('../modules/errors');
module.exports = (app) => {

    // ADD ITEM TO CATALOGUE
    app.post("/api/items/add", async (req, res) => {
        try {
            let request = req.body;


            const name = request.name;
            const price = request.price;
            const brand = request.brand;
            const description = request.description;
            const image = request.image;
            const stock = request.stock;
            // check data is valid
            if (!name || !brand || !description || !image) throw new Error("Missing information");
            if (typeof price !== 'number') throw new Error("price is not a number");
            if (typeof stock !== 'number') throw new Error("stock is not a number");
            // insert into database
            await createItemInCatalogue(name, price, brand, description, image, stock);
            res.status(200).end("an item was created");
        } catch (err) {
            console.log(err)
            res.status(500).end("Internal Server Error");
        }
    });



    app.get("/api/item", async (req, res) => {
        try {
            const request = req.body;
            const requestedItemId = request.itemId;
            const item = await Item.findOne({
                where: {
                    itemId: requestedItemId
                }
            });
            const itemData = {
                itemId: item.itemId,
                name: item.name,
                price: item.price,
                brand: item.brand,
                description: item.description,
                image: item.image
            }

            res.send(itemData);
        } catch (error) {
            res.status(500).end("error: item probably doesn't exist")
        }
    });
    // GET ALL ITEMS FROM CATALOGUE
    app.get("/api/items", async (req, res) => {
        try {
            const catalogue = await Item.findAll();
            res.send({
                catalogue: catalogue
            })
        } catch (err) {
            res.status(500).end("Internal Server Error");
        }
    });

    // get all items from the Inventory
    app.get("/api/inventory", async (req, res) => {
        try {
            const inventory = await Inventory.findAll({ include: Item });
            res.send({
                inventory: inventory
            })
        } catch (err) {
            res.status(500).end("Internal server error");
        }
    });

    // ADD QUANTITY OF ITEM TO AN INVENTORY
    app.post("/api/inventory/add", async (req, res) => {
        try {
            let request = req.body;
            const itemID = request.itemID;
            const stockToAdd = parseInt(request.amount);

            if (stockToAdd < 1) throw new Error("Amount must be greater than 0");
            const itemFromDB = await Item.findByPk(itemID);
            if (!itemFromDB) throw new Error("Item does not exist");

            await addItemToInventory(itemFromDB, stockToAdd);
            res.status(200).end("an item was added to the inventory");
        } catch (err) {
            res.status(500).end("Internal Server Error");
        }
    });

    // REMOVE QUANTITY OF ITEM TO AN INVENTORY
    app.post("/api/inventory/deduct", async (req, res) => {
        try {
            let request = req.body;
            const itemID = request.itemID;
            const stockToRemove = parseInt(request.amount);

            if (stockToRemove < 1) throw new Error("Amount must be greater than 0");
            const itemFromDB = await Item.findByPk(itemID);
            if (!itemFromDB) throw new Error("Item does not exist");
            if (itemFromDB.quantity < stockToRemove) throw new Error("Cannot have negative stock");

            await removeItemFromInventory(itemFromDB, stockToRemove);
            res.status(200).end("an item was removed from the inventory");
        } catch (err) {
            res.status(500).end("Internal Server Error");
        }
    });

    app.post("/api/inventory/checkout", async (req, res) => {
        try {
            const request = req.body;
            let shoppingCart = request.shoppingCart
            console.log(req.session.user);

            // make a new user info object, because the user could have changed their 
            // billing information during the checkout process, can't use the stored info in db
            const userInfo = {
                userId: request.userId,
                creditCard: request.creditCard,
                cvv: request.cvv,
                expiry: request.expiry
            }
            // remap to match json on the backend
            const shoppingCartFormatted = shoppingCart.map(item => ({
                itemId: item.itemId,
                quantity: item.amount
            }))
            // TODO: replace the null with the user model
            await checkout(userInfo, shoppingCartFormatted);
            res.status(200).end("checkout completed");

        } catch (e) {
            if (e instanceof OutOfStockError) {
                res.status(400).end("Item(s) out of stock");
            } else if (e instanceof PaymentError) {
                res.status(400).end("Credit Card Authorization Failed");
            } else if (e instanceof InvalidCartError) {
                res.status(400).end("No items in cart");
            } else {
                res.status(500).end("checkout failed");
            }
        }
    });


    app.post("/api/inventory/search", async (req, res) => {
        try {
            const request = req.body;
            const searchTerm = request.searchTerm
            // make a new user info object, because the user could have changed their 
            // billing information during the checkout process, can't use the stored info in db
            const matchingInventoryItems = await searchForItem(searchTerm);
            console.log(matchingInventoryItems);
            res.send({
                inventory: matchingInventoryItems
            });
        } catch {
            res.status(500).end("item search failed");
        }
    });

    app.put("/api/items/update", async (req, res) => {
        try {
            const request = req.body;
            const updatePacket = {
                itemId: request.itemId,
                newItemName: request.name,
                newItemPrice: request.price,
                newItemBrand: request.brand,
                newItemDescription: request.description,
                newImage: request.image,
                newStock: request.stock
            }
            await updateItemFromCatalogue(updatePacket);
            res.status(200).end("item updated")
        } catch (err) {
            res.status(500).end("error updaing item")
        }
    });



}