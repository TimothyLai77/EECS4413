require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const inventoryController = require("./server/controller/inventoryManagement");
const { connectToDb } = require("./server/data/sequelizeModels/index");

const { createUsersTest } = require("./server/tests/dbTest");
const { checkout } = require('./server/modules/Checkout');

const PORT = 8080;
const CLIENT_FRONTEND_PATH = path.join(__dirname, "client", "build");



const env = process.env;

async function prepareApp() {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use("/", express.static(CLIENT_FRONTEND_PATH))
    inventoryController(app);
    await connectToDb();

    // DEBUG TESTING
    //await createUsersTest();
    // await checkout(null, [{
    //     itemId: "item-14allk111lz0dat7m",
    //     quantity: 1
    // },
    // {
    //     itemId: "item-14allk111lz0dat7o",
    //     quantity: 3
    // },
    // ]);


    app.listen(PORT, () => {
        console.log("express started");
    })
}

prepareApp();


