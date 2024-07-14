const { connectToDb } = require("../../modules/db")
const { Transaction } = require('./Transaction');
const { User } = require('./User');
const { LedgerEntry } = require('./LedgerEntry')
const { Item } = require('./Item');
const modelList = [User, Transaction, LedgerEntry, Item];

const connectAndAssociate = async () => {
    //connect to db first before doing the associations
    await connectToDb(modelList);

    // ASSOCIATION DEFINITIONS
    User.hasMany(Transaction, { foreignKey: 'userId' });
    Transaction.hasOne(User, { foreignKey: "userId" });
    Transaction.hasMany(LedgerEntry, { foreignKey: "transactionId" });
    LedgerEntry.hasOne(Transaction, { foreignKey: "transactionId" });
};

exports.connectToDb = connectAndAssociate;
exports.User = User;
exports.Transaction = Transaction;
exports.LedgerEntry = LedgerEntry;
exports.Item = Item;