require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const inventoryController = require("./server/controller/inventoryManagement");
const { connectToDb } = require("./server/modules/db");
const PORT = 8080;
const CLIENT_FRONTEND_PATH = path.join(__dirname, "client", "build");

const env = process.env;

function prepareApp() {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use("/", express.static(CLIENT_FRONTEND_PATH))
    inventoryController(app);
    connectToDb();
    return app;
}


let app = prepareApp();
app.listen(PORT, () => {
    console.log("express started");
})