const { Sequelize, DataTypes, Model } = require('sequelize');
const { User } = require('../data/sequelizeModels/User');
const { Transaction } = require('../data/sequelizeModels/Transaction');
const { LedgerEntry } = require('../data/sequelizeModels/LedgerEntry')
const { Item } = require('../data/sequelizeModels/Item');
const dayjs = require('dayjs');

// customer side get all of their transactions
const getUserTransactions = async (userId) => {
    const userModel = await User.findByPk(userId);
    if (!userModel) throw new Error("user does not eixst");

    const allTransactionModels = await Transaction.findAll({
        include: [
            { model: LedgerEntry, include: Item },
            { model: User }
        ],
        where: {
            userId: userId
        }
    });
    let returnList = allTransactionModels.map((t) => {
        return {
            transactionId: t.transactionId,
            total: t.total,
            date: t.date,
            userId: t.userId,
            userEmail: t.User.email,
            userFirstName: t.User.firstName,
            userLastName: t.User.lastName,
            itemsBought: t.LedgerEntries.map((itemBought) => ({
                itemName: itemBought.Item.name,
                itemBrand: itemBought.Item.brand,
                priceSold: itemBought.priceSold,
                quantity: itemBought.quantity
            }))
        }
    });
    returnList = returnList.sort((transactionA, transactionB) => {
        const dateA = dayjs(transactionA.date).unix();
        const dateB = dayjs(transactionB.date).unix();
        return dateB - dateA;
    })
    return returnList;
}

// get the details/ledger entries for a specific transaction
const getTransactionDetails = async (transactionId) => {
    // check valid transaction
    const transaction = await Transaction.findByPk(transactionId);
    if (!transaction) throw new Error("invalid transaction ID");

    // get the details of the transaction requested
    const ledgerList = await LedgerEntry.findAll({
        where: {
            transactionId: transactionId
        }
    });
    //console.log(ledgerList);
    // make a new object to send to client
    const transactionDetails = ledgerList.map((ledgerE) => {
        return {
            transactionId: ledgerE.transactionId,
            itemId: ledgerE.itemId,
            priceSold: ledgerE.priceSold,
            quantity: ledgerE.quantity
        }
    });
    return transactionDetails;
}


// admin side, get all transactions
const getAllTransactions = async () => {
    const allTransactionModels = await Transaction.findAll({
        include: [
            { model: LedgerEntry, include: Item },
            { model: User }
        ]
    });
    console.log(allTransactionModels);
    let returnList = allTransactionModels.map((t) => {
        return {
            transactionId: t.transactionId,
            total: t.total,
            date: t.date,
            userId: t.userId,
            userEmail: t.User.email,
            userFirstName: t.User.firstName,
            userLastName: t.User.lastName,
            itemsBought: t.LedgerEntries.map((itemBought) => ({
                itemName: itemBought.Item.name,
                itemBrand: itemBought.Item.brand,
                priceSold: itemBought.priceSold,
                quantity: itemBought.quantity
            }))
        }
    });
    returnList = returnList.sort((transactionA, transactionB) => {
        const dateA = dayjs(transactionA.date).unix();
        const dateB = dayjs(transactionB.date).unix();
        return dateB - dateA;
    })
    return returnList;
}

exports.getTransactionDetails = getTransactionDetails;
exports.getAllTransactions = getAllTransactions;
exports.getUserTransactions = getUserTransactions;