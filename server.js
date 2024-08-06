require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const session = require('express-session');

const inventoryController = require("./server/controller/inventoryManagement");
const userController = require("./server/controller/userManagement");
const transactionController = require('./server/controller/transactionManagement');
const { connectToDb } = require("./server/data/sequelizeModels/index");
const { touchAdminUser } = require('./server/modules/UserManager');
const { createUsersTest } = require("./server/tests/dbTest");
const { checkout } = require('./server/modules/Checkout');
const { getTransactionDetails, getUserTransactions } = require('./server/modules/TransactionManager');
const {createTestItems} = require('./server/tests/dbTest');
const {searchForItem} = require('./server/modules/InventoryManager');
const PORT = 8080;
const CLIENT_FRONTEND_PATH = path.join(__dirname, "client", "build");

const expressSessionConfig = session({
    secret: "eecs4413",
    resave: false,
    HttpOnly: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      sameSite: true,
    },
  });
  


const env = process.env;

async function prepareApp() {
    const app = express();
    app.set("trust proxy", 1);
    app.use(express.json());
    app.use(cors());
    app.use(expressSessionConfig);

    app.use("/", express.static(CLIENT_FRONTEND_PATH))
    inventoryController(app);
    userController(app);
    transactionController(app);
    await connectToDb();
    await touchAdminUser();
    
    // DEBUG: 
    // await getUserTransactions('user-s97h0ajlzbzepz2')
    // await getTransactionDetails('transaction-s97h0ajlzbzg0cy')
    //await createTestItems();
    // let searchItems = await searchForItem("item 1");
    // console.log(JSON.stringify(searchItems, null, 2));
    // searchItems = await searchForItem("brand 2");
    // console.log(JSON.stringify(searchItems, null, 2));
    // searchItems = await searchForItem("match");
    // console.log(JSON.stringify(searchItems, null, 2));

    app.use("/*", express.static(CLIENT_FRONTEND_PATH));


    app.listen(PORT, () => {
        console.log("express started");
    })
}

prepareApp();


