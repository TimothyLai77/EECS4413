const { Sequelize, DataTypes, Model, DATEONLY } = require('sequelize');
const { appDatabase } = require('../../modules/db');
class Inventory extends Model { }

Inventory.init(
    {
        itemId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        sequelize: appDatabase, // pass the model definition into the database connection
        modelName: 'Inventory', // We need to choose the model name
        freezeTableName: true,
    },
);


exports.Inventory = Inventory;