const { Sequelize, DataTypes, Model } = require('sequelize');
const { Item } = require('../data/sequelizeModels/Item');
const { Inventory } = require('../data/sequelizeModels/Inventory');
const uniqid = require('uniqid');

/**
 * Creates the Item and adds to inventory
 * @param {*} itemName 
 * @param {*} itemPrice 
 * @param {*} itemQuantity 
 */
async function createItemInInventory(itemName, itemPrice, itemQuantity) {
    // create the item in an item database
    const itemId = uniqid('item-');
    const newItem = await Item.create({
        itemId: itemId,
        name: itemName,
        price: itemPrice
    });
    const inventoryEntry = await Inventory.create({ itemId: itemId, quantity: itemQuantity });
}

exports.createItemInInventory = createItemInInventory;
