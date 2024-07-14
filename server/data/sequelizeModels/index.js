const { connectToDb } = require("../../modules/db")
const { Transaction } = require('./Transaction');
const { User } = require('./User');
const { Ledger } = require('./Ledger')
const { Item } = require('./Item');
const modelList = [User, Transaction, Ledger, Item];

const connectAndAssociate = async () => {
    //connect to db first before doing the associations
    await connectToDb(modelList);

    // ASSOCIATION DEFINITIONS
    User.hasMany(Transaction, { foreignKey: 'userId' });
    Transaction.hasOne(User, { foreignKey: "userId" });
    Transaction.hasMany(Ledger, { foreignKey: "transactionId" });
    Ledger.hasOne(Transaction, { foreignKey: "transactionId" });
};

exports.connectToDb = connectAndAssociate;
exports.User = User;
exports.Transaction = Transaction;
exports.Ledger = Ledger;
exports.Item = Item;