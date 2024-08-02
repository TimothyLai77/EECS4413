require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const inventoryController = require("./server/controller/inventoryManagement");
const userController = require("./server/controller/userManagement");
const transactionController = require('./server/controller/transactionManagement');
const { connectToDb } = require("./server/data/sequelizeModels/index");
const { touchAdminUser } = require('./server/modules/UserManager');
const { createUsersTest } = require("./server/tests/dbTest");
const { checkout } = require('./server/modules/Checkout');
const { getTransactionDetails, getUserTransactions } = require('./server/modules/TransactionManager');
const PORT = 8080;
const CLIENT_FRONTEND_PATH = path.join(__dirname, "client", "build");



const env = process.env;

async function prepareApp() {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use("/", express.static(CLIENT_FRONTEND_PATH))
    inventoryController(app);
    userController(app);
    transactionController(app);
    await connectToDb();
    await touchAdminUser();
    // DEBUG: 
    // await getUserTransactions('user-s97h0ajlzbzepz2')
    // await getTransactionDetails('transaction-s97h0ajlzbzg0cy')


    app.use("/*", express.static(CLIENT_FRONTEND_PATH));


    app.listen(PORT, () => {
        console.log("express started");
    })
}

prepareApp();


