const { Sequelize, DataTypes, Model, DATEONLY } = require('sequelize');
const { appDatabase } = require('../../modules/db');
class Transaction extends Model { }

Transaction.init(
    {
        transactionId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        total: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize: appDatabase, // pass the model definition into the database connection
        modelName: 'Transaction', // We need to choose the model name
    },
);


exports.Transaction = Transaction;