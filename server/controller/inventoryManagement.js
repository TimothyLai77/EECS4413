const {
    createItemInCatalogue,
    addItemToInventory,
    removeItemFromInventory,
    removeItemFromCatalogue,
} = require('../modules/InventoryManager');
const { Item } = require('../data/sequelizeModels/Item');
const { Inventory } = require('../data/sequelizeModels/Inventory');
const { OutOfStockError } = require('../modules/errors');
module.exports = (app) => {

    // ADD ITEM TO CATALOGUE
    app.post("/api/items/add", async (req, res) => {
        try {
            // DEBUG/SAMPLE CODE: 
            createItemInCatalogue("item 1", 69.69);
            createItemInCatalogue("item 2", 2.12);
            createItemInCatalogue("item 3", 120.1);
            createItemInCatalogue("item 4", 1000);
            res.status(200).end("an item was created");
        } catch (err) {
            res.status(500).end("Internal Server Error");
        }
    });

    // remove item from the catalogue completely
    app.post("/api/items/remove", async (req, res) => {
        try {
            // DEBUG/SAMPLE CODE: 
            // const i = await Item.findByPk("item-14allk1tvslyoz0gqs");
            await removeItemFromCatalogue(i);
            res.status(200).end();
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

    // get all items from the Inventory
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
    app.post("/api/inventory/add", async (req, res) => {
        try {
            // DEBUG/SAMPLE CODE: 
            const itemsToAdd = ['item-14allk111lz0dat7m', 'item-14allk111lz0dat7o', 'item-14allk111lz0dat7p'];

            // add each item to the inventory
            await itemsToAdd.forEach(async (id) => {
                const i = await Item.findByPk(id);
                if (!i) throw new Error("Item does not exist");
                await addItemToInventory(i, 3);
            });
            res.status(200).end("an item was added to the inventory");
        } catch (err) {
            res.status(500).end("Internal Server Error");
        }
    });

    // REMOVE QUANTITY OF ITEM TO AN INVENTORY
    app.post("/api/inventory/remove", async (req, res) => {
        try {
            //const itemsToRemove = ['item-14allk1tvslyoz0gqu', 'item-14allk1tvslyoz0gqv'];


            // wait for all removes to finish
            // await Promise.all(itemsToRemove.map(async (id) => {
            //     const item = await Item.findByPk(id);
            //     if (!item) throw new Error("Item does not exist");
            //     await removeItemFromInventory(item, 1);
            // }));

            res.status(200).end("an item was removed");
        } catch (err) {
            if (err instanceof OutOfStockError) {
                res.status(400).end(err.message);
            } else {
                res.status(500).end("Internal Server Error");
            }

        }
    });





}