const { Sequelize, DataTypes, Model } = require('sequelize');
const { User } = require('../data/sequelizeModels/User');
const uniqid = require('uniqid');
const { OutOfStockError } = require('../modules/errors')

const createNewUser = async (firstName, lastName, email, password) => {
    const userId = uniqid('user-');
    newUser = await User.create({
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: User.generateHash(password)
    });
};

exports.createNewUser = createNewUser;