const { Sequelize, DataTypes, Model, DATEONLY } = require('sequelize');
const { appDatabase } = require('../../modules/db');
class LedgerEntry extends Model { }

LedgerEntry.init(
    {
        transactionId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        itemId: {
            type: DataTypes.STRING,
        },
        priceSold: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    },
    {
        sequelize: appDatabase, // pass the model definition into the database connection
        modelName: 'LedgerEntry', // We need to choose the model name
    },
);


exports.LedgerEntry = LedgerEntry;