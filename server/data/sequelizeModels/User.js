const { Sequelize, DataTypes, Model, DATEONLY } = require('sequelize');
const { appDatabase } = require('../../modules/db')
const bcrypt = require('bcrypt');
class User extends Model {


    static generateHash(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync());
    }

    validatePassword = function (password) {
        return bcrypt.compareSync(password, this.password)
    }

}

User.init(
    {
        userId: {
            type: DataTypes.STRING,
            primaryKey: true,
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
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        password: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize: appDatabase, // pass the model definition into the database connection
        modelName: 'User', // We need to choose the model name
        logging: false
    },
);




exports.User = User;