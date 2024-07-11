require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");


const inventoryController = require("./server/controller/inventoryManagement");
const { connectToDb } = require("./server/modules/db");
const { User } = require('./server/data/sequelizeModels/User')
const modelList = [User]

const PORT = 8080;
const CLIENT_FRONTEND_PATH = path.join(__dirname, "client", "build");



const env = process.env;

async function prepareApp() {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use("/", express.static(CLIENT_FRONTEND_PATH))
    inventoryController(app);
    await connectToDb(modelList);

    app.listen(PORT, () => {
        console.log("express started");
    })
}

prepareApp();


