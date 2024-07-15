const { createItemInInventory } = require('../modules/InventoryManager');

module.exports = (app) => {
    app.post("/api/inventory/items", async (req, res) => {
        try {
            console.log("create item");
            createItemInInventory("My Item", 69.69, 420);
            res.status(200).end("an item was created");
        } catch (err) {
            res.status(500).end("Internal Server Error");
        }
    });
}