module.exports = (app) => {
    app.post("/api/inventory/items", async (req, res) => {
        try{
            console.log("create item");
            res.status(200).end("an item was created");
        } catch (err) {
            res.status(500).end("Internal Server Error");
        }
    });
}