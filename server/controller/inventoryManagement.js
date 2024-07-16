const { createItemInCatalogue, addItemToInventory } = require('../modules/InventoryManager');
const { Item } = require('../data/sequelizeModels/Item');
const { Inventory } = require('../data/sequelizeModels/Inventory');
module.exports = (app) => {

    // ADD ITEM TO CATALOGUE
    app.post("/api/items", async (req, res) => {
        try {
            //console.log("create item");
            createItemInCatalogue("My Item", 69.69, 420);
            res.status(200).end("an item was created");
        } catch (err) {
            res.status(500).end("Internal Server Error");
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


    app.get("/api/inventory", async (req, res) => {
        try {
            const inventory = await Inventory.findAll();
            res.send({
                inventory: inventory
            })
        } catch (err) {
            res.status(500).end("Internal server error");
        }
    });

    // ADD QUANTITY OF ITEM TO AN INVENTORY
    app.post("/api/inventory", async (req, res) => {
        try {
            const itemIdToAdd = "item-14allk6hylynolsrj";
            //console.log("create item");
            const itemModel = await Item.findByPk(itemIdToAdd);
            if (!itemModel) throw new Error("Item does not exist");
            await addItemToInventory(itemModel, 420);
            res.status(200).end("an item was created");
        } catch (err) {
            res.status(500).end("Internal Server Error");
        }
    });


}