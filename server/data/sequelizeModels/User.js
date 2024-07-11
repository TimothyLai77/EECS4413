const { Sequelize, DataTypes, Model, DATEONLY } = require('sequelize');
const { appDatabase } = require('../../modules/db')
class User extends Model { }

User.init(
    {
        // Model attributes are defined here
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        creditCardNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        creditCardExpiry: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cvv: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        billingAddress: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        shippingAddress: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        sequelize: appDatabase, // pass the model definition into the database connection
        modelName: 'User', // We need to choose the model name
    },
);


exports.User = User;