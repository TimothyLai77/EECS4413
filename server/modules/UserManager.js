const { Sequelize, DataTypes, Model } = require('sequelize');
const { User } = require('../data/sequelizeModels/User');
const uniqid = require('uniqid');
const { EmailAlreadyExistsError, UserDoesNotExistError } = require('../modules/errors');

// lol
const ADMIN_EMAIL = "root@app.com";
const ADMIN_PASSWORD = "root";

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
        const newUser = await User.create({
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: User.generateHash(password)
        });
        return newUser;
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

const updateUserAddress = async (User, ccNumber, ccExpiry, cvv, billingAddress) => {
    const userToUpdate = await User.findByPk(User.userId);
    if (!userToUpdate) {
        // if user does exist, delete and save changes
        await userToUpdate.set({
            creditCardNumber: ccNumber,
            creditCardExpiry: ccExpiry,
            cvv: cvv,
            billingAddress: billingAddress
        });
        userToUpdate.save();
    } else {
        // user does not exist
        throw new UserDoesNotExistError;
    }
};

const updateUserBillingInfo = async (User, newShippingAddress) => {
    const userToUpdate = await User.findByPk(User.userId);
    if (!userToUpdate) {
        // if user does exist, delete and save changes
        await userToUpdate.set({
            shippingAddress: newShippingAddress,
        });
        userToUpdate.save();
    } else {
        // user does not exist
        throw new UserDoesNotExistError;
    }
};

const promoteUserToAdmin = async (User) => {
    const userToPromote = await User.findByPk(User.userId);
    if (!userToPromote) {
        await userToPromote.set({
            isAdmin: true
        })
        userToPromote.save();
    }
};

const authenticateUserLogin = async (email, password) => {
    const user = await User.findOne({
        where: {
            email: email
        }
    });
    if (!user) throw Error("no user");
    if (user.validatePassword(password)) {
        return user;
    } else {
        throw new Error("invalid login");
    }

}

const touchAdminUser = async () => {
    const checkAdminExists = await User.findOne({
        where: {
            email: ADMIN_EMAIL
        }
    })
    // admin already exists
    if (checkAdminExists) {
        return
    } else {
        // no admin create one
        const userId = uniqid('user-');
        await User.create({
            userId: userId,
            firstName: "root",
            lastName: "root",
            email: ADMIN_EMAIL,
            password: User.generateHash(ADMIN_PASSWORD),
            isAdmin: true
        });
    }
}



exports.touchAdminUser = touchAdminUser;
exports.createNewUser = createNewUser;
exports.deleteUser = deleteUser;
exports.updateUserAddress = updateUserAddress;
exports.updateUserBillingInfo = updateUserBillingInfo;
exports.promoteUserToAdmin = promoteUserToAdmin;
exports.authenticateUserLogin = authenticateUserLogin;