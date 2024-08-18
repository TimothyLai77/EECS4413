const { Sequelize, DataTypes, Model } = require('sequelize');
const { User } = require('../data/sequelizeModels/User');
const { Inventory } = require('../data/sequelizeModels/Inventory');
const { Transaction } = require('../data/sequelizeModels/Transaction');
const { Item, LedgerEntry } = require('../data/sequelizeModels/index');
const uniqid = require('uniqid');
const { InvalidOperationError } = require('../modules/errors');
const { parse } = require('dotenv');
const dayjs = require('dayjs');
var customParseFormat = require("dayjs/plugin/customParseFormat");
const { PaymentError, OutOfStockError } = require('../modules/errors');


dayjs.extend(customParseFormat);
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
    if (!userModel) throw new Error("user does not exist");

    //TODO: CC VALIDATION HERE
    let creditCardString = userInfo.creditCard;
    if (!creditCardString) {
        throw new PaymentError("Invalid formatting");
    }
    creditCardString = creditCardString.replaceAll(" ", "");
    const ccRegex = /[0-9]{16}/mi;
    if (!ccRegex.test(creditCardString)) throw new PaymentError("Invalid Formatting");
    if (userInfo.cvv > 999 || userInfo.cvv < 0) throw new PaymentError("invalid cvv format");

    // CC Expiry validation
    userExpiry = dayjs(userInfo.expiry, ['MM/YY', 'MM/YYYY', 'MM YY', 'MM YYYY']);
    if (!userExpiry.isValid()) throw new PaymentError("invalid expiry date format");
    userExpiry = userExpiry.endOf('month'); // set the cc expiry to end of month
    if (userExpiry.isBefore(dayjs())) throw new PaymentError("credit card expired");

    ``
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
            throw new OutOfStockError("Not enough stock");
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
    let total = 0.0;
    // generate a ledger list of ledger entries for each item in the transaction 
    ledgerList = await Promise.all(itemList.map(async (item) => {
        const catalogItem = await Item.findByPk(item.itemId);
        const quantityPurchased = item.quantity;
        if (!catalogItem) throw new Error("item does not exist in the catalog");
        console.log(catalogItem);

        const priceSold = catalogItem.price * quantityPurchased;
        total += priceSold;
        return await LedgerEntry.create({
            transactionId: transactionId,
            itemId: item.itemId,
            priceSold: priceSold,
            quantity: quantityPurchased
        });
    }));
    //console.log(ledgerList);
    // make a transaction

    //BUG: the dates are pretty wrong, at least on my machine, fix when i have time to get around to it
    await Transaction.create({
        transactionId: transactionId,
        total: total,
        date: new Date(),
        userId: userInfo.userId
    });
}

exports.checkout = checkout;