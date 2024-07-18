const { Sequelize, DataTypes, Model, DATEONLY } = require('sequelize');
const { appDatabase } = require('../../modules/db')
const bcrypt = require('bcrypt');
class User extends Model { }

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

    },
);


// Hash generation and comparison for the users.
// TODO: I don't know if it matters or not now, but I'm using hashSync and not the async version...
// it does feel a little slow
Model.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
}

Model.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

exports.User = User;