require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const inventoryController = require("./server/controller/inventoryManagement");
const { Sequelize } = require('sequelize');

const PORT = 8080;
const CLIENT_FRONTEND_PATH = path.join(__dirname, "client", "build");

const env = process.env;


const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USER, env.DATABASE_PASSWORD, {
    host: env.DATABASE_SERVER,
    dialect: 'mariadb',
    port: parseInt(env.DATABASE_PORT)
});

async function connectToDb(){
    try {
        await sequelize.authenticate();
        console.log('Connection to mariaDB has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

function prepareApp(){
    
    
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