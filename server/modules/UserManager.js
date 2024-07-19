const { Sequelize, DataTypes, Model } = require('sequelize');
const { User } = require('../data/sequelizeModels/User');
const uniqid = require('uniqid');
const { EmailAlreadyExistsError } = require('../modules/errors')

const createNewUser = async (firstName, lastName, email, password) => {


    // check duplicate emails
    const duplicateUserCheck = await User.findOne({
        where: {
            email: email
        }
    });
    // email does not exist in db, 
    if (!duplicateUserCheck) {
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

// const deleteUser = async (User) => {
//     const userToDelete()
// };

exports.createNewUser = createNewUser;