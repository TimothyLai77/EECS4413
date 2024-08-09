const { connectToDb } = require("../../modules/db")
const { Transaction } = require('./Transaction');
const { User } = require('./User');
const { LedgerEntry } = require('./LedgerEntry')
const { Item } = require('./Item');
const { Inventory } = require('./Inventory');
const modelList = [
    User,
    Transaction,
    LedgerEntry,
    Item,
    Inventory
];

const connectAndAssociate = async () => {
    //connect to db first before doing the associations
    await connectToDb(modelList);

    // ASSOCIATION DEFINITIONS
    // User and Transactions
    User.hasMany(Transaction, { foreignKey: 'userId' });
    Transaction.belongsTo(User, { foreignKey: "userId" });

    // Inventory and Items
    Inventory.hasOne(Item, { foreignKey: "itemId" });
    Item.hasOne(Inventory, {foreignKey: "itemId"});

    // Transactions and Ledgers
    Transaction.hasMany(LedgerEntry, { foreignKey: "transactionId" });
    LedgerEntry.hasOne(Transaction, { foreignKey: "transactionId" });
    LedgerEntry.belongsTo(Item, {foreignKey: "itemId"});


};

exports.connectToDb = connectAndAssociate;
exports.User = User;
exports.Transaction = Transaction;
exports.LedgerEntry = LedgerEntry;
exports.Item = Item;
exports.Inventory = Inventory;