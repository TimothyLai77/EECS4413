const { Sequelize, DataTypes, Model } = require('sequelize');
const { User } = require('../data/sequelizeModels/User');
const { Inventory } = require('../data/sequelizeModels/Inventory');
const { Transaction } = require('../data/sequelizeModels/Transaction');
const { Item } = require('../data/sequelizeModels/index');
const uniqid = require('uniqid');
const { InvalidOperationError } = require('../modules/errors');


/**
 * 
 * @param {*} userModel 
 * @param {Object[]} itemList where each element is of the form {itemId: STRING, quantity: INTEGER} 
 */
const checkout = async (userModel, itemList) => {
    // Fetch the inventory items that match the itemList requested, joined with Item info
    const fetchItemsFromInventory = await Promise.all(itemList.map(async itemToBuy => {
        const itemInInventory = await Inventory.findByPk(itemToBuy.itemId, { include: Item });
        return {
            item: itemInInventory,
            requestedQuantity: itemToBuy.quantity
        }
    }));
    // loop through list to check stock
    fetchItemsFromInventory.forEach(item => {
        if (item.requestedQuantity > item.item.quantity) {
            // not enough quantity
            throw new InvalidOperationError("Not enough stock");
        }
    })

    // Deduct items from inventory
    // p is an array of promises to update each item in the inventory
    const p = fetchItemsFromInventory.map(async (i) => {
        const inventoryItem = i.item;
        inventoryItem.quantity -= i.requestedQuantity;
        await inventoryItem.save();
    });

    // wait for inventory quantities to be updated
    await Promise.all(p);

    //TODO: make Ledger entires, and create a transaction for the user buying it

}

exports.checkout = checkout;