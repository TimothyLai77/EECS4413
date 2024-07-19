const { Sequelize, DataTypes, Model } = require('sequelize');
const { User } = require('../data/sequelizeModels/User');
const uniqid = require('uniqid');
const { EmailAlreadyExistsError, UserDoesNotExistError } = require('../modules/errors')

const createNewUser = async (firstName, lastName, email, password) => {


    // check duplicate emails
    const duplicateUserCheck = await User.findOne({
        where: {
            email: email
        }
    });

    if (!duplicateUserCheck) {
        // if email does not exist in the DB 
        const userId = uniqid('user-');
        newUser = await User.create({
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: User.generateHash(password)
        });
    } else {
        throw new EmailAlreadyExistsError;
    }
};

const deleteUser = async (User) => {
    const userToDelete = await User.findByPk(User.userId);
    if (!userToDelete) {
        // if user does exist, delete and save changes
        await userToDelete.destroy();
        await userToDelete.save();
    } else {
        // user does not exist
        throw new UserDoesNotExistError;
    }
};

exports.createNewUser = createNewUser;
exports.deleteUser = deleteUser;