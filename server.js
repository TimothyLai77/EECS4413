require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");


const inventoryController = require("./server/controller/inventoryManagement");
const { connectToDb } = require("./server/data/sequelizeModels/index");
//todo: clean this up, idk how to get them into one statement

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


    // await User.create({
    //     userId: "1",
    //     firstName: "tim",
    //     lastName: "lai",
    //     email: "a@gmail.com",
    //     creditCardNumber: "1123",
    //     creditCardExpiry: "05/21",
    //     cvv: 123,
    //     billingAddress: "b address",
    //     shippingAddress: "s address"
    // });

    // const myUser = await User.findByPk("1");
    // myUser.email = "new email yo";
    // await myUser.save();
    // console.log(myUser.email);



    app.listen(PORT, () => {
        console.log("express started");
    })
}

prepareApp();


