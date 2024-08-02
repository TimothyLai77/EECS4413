const { Sequelize, DataTypes, Model } = require('sequelize');
const { User } = require('../data/sequelizeModels/User');
const { Inventory } = require('../data/sequelizeModels/Inventory');
const { Transaction } = require('../data/sequelizeModels/Transaction');
const { Item, LedgerEntry } = require('../data/sequelizeModels/index');
const uniqid = require('uniqid');
const { InvalidOperationError } = require('../modules/errors');


/**
 * 
 * @param {*} userModel 
 * @param {Object[]} itemList where each element is of the form {itemId: STRING, quantity: INTEGER} 
 */
const checkout = async (userInfo, itemList) => {
    // Fetch the inventory items that match the itemList requested, joined with Item info



    /**
     * FROM EXPRESS:
     * const userInfo = {
                userId : request.userId,
                creditCard : request.creditCard,
                cvv : request.cvv,
                expiry: request.expiry
            }
     */
    const userModel = await User.findByPk(userInfo.userId);
    if(!userModel) throw new Error("user does not exist");

    //TODO: CC VALIDATION HERE





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

    //  generate Ledger entires and transaction
    const transactionId = uniqid("transaction-");
    // generate a ledger list of ledger entries for each item in the transaction 
    ledgerList = await Promise.all(itemList.map(async (item) =>{
        const catalogItem = await Item.findByPk(item.itemId);
        const quantityPurchased = item.quantity;
        if(!catalogItem) throw new Error("item does not exist in the catalog");
        console.log(catalogItem);

        const priceSold = catalogItem.price*quantityPurchased;

        return await LedgerEntry.create({
            transactionId : transactionId,
            itemId: item.itemId,
            priceSold: priceSold,
            quantity: quantityPurchased
        });
    }));
    //console.log(ledgerList);
    // make a transaction

    //BUG: the dates are pretty wrong, at least on my machine, fix when i have time to get around to it
    t = await Transaction.create({
        transactionId: transactionId,
        date: DataTypes.NOW,
        userId: userInfo.userId
    });
     console.log(t);
}

exports.checkout = checkout;