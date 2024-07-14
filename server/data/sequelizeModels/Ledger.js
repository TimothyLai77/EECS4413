const { Sequelize, DataTypes, Model, DATEONLY } = require('sequelize');
const { appDatabase } = require('../../modules/db');
class Ledger extends Model { }

Ledger.init(
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
        modelName: 'Ledger', // We need to choose the model name
    },
);


exports.Ledger = Ledger;