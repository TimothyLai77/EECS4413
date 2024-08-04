const { Sequelize, DataTypes, Model } = require('sequelize');
const { User } = require('../data/sequelizeModels/User');
const {Transaction } = require('../data/sequelizeModels/Transaction');
const {LedgerEntry} = require('../data/sequelizeModels/LedgerEntry')


// customer side get all of their transactions
const getUserTransactions = async (userId) => {
    const userModel = await User.findByPk(userId);
    if(!userModel) throw new Error("user does not eixst");

    const userTransactionList = await Transaction.findAll({
        where: {
            userId: userId
        }
    })

    // make new transaction list for client
    const returnList = userTransactionList.map((t) => {
        return {
            transactionId: t.transactionId,
            total: t.total,
            date: t.date,
            userId: t.userId
        }
    });
    return returnList;
}

// get the details/ledger entries for a specific transaction
const getTransactionDetails = async (transactionId) => {
    // check valid transaction
    const transaction = await Transaction.findByPk(transactionId);
    if(!transaction) throw new Error("invalid transaction ID");

    // get the details of the transaction requested
    const ledgerList = await LedgerEntry.findAll({
        where:{
            transactionId :transactionId
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
    const allTransactionModels = await Transaction.findAll();
    const returnList = allTransactionModels.map((t) => {
        return {
            transactionId: t.transactionId,
            total: t.total,
            date: t.date,
            userId: t.userId
        }
    })
    return returnList;
}

exports.getTransactionDetails = getTransactionDetails;
exports.getAllTransactions = getAllTransactions;
exports.getUserTransactions = getUserTransactions;