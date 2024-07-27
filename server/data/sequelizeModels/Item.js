const { Sequelize, DataTypes, Model, DATEONLY } = require('sequelize');
const { appDatabase } = require('../../modules/db')
class Item extends Model { }

Item.init(
    {
        itemId: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize: appDatabase, // pass the model definition into the database connection
        modelName: 'Item', // We need to choose the model name
    },
);


exports.Item = Item;