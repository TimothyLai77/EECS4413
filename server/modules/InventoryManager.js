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
const createItemInCatalogue = async (itemName, itemPrice) => {
    // create the item in an item database
    const itemId = uniqid('item-');
    await Item.create({
        itemId: itemId,
        name: itemName,
        price: itemPrice
    });
    //const inventoryEntry = await Inventory.create({ itemId: itemId, quantity: itemQuantity });
};


const addItemToInventory = async (itemModel, quantity) => {
    const itemIdToAdd = itemModel.itemId;
    // check for duplicate
    const inventoryEntry = await Inventory.findByPk(itemIdToAdd);

    if (!inventoryEntry) {
        // if item does not exist in the inventory
        await Inventory.create({
            itemId: itemIdToAdd,
            quantity: quantity
        })
    } else {
        // item already exists, ADD the new quantity to the existing quantity
        inventoryEntry.quantity += quantity;
        await inventoryEntry.save();
    }
};

exports.createItemInCatalogue = createItemInCatalogue;
exports.addItemToInventory = addItemToInventory;