const { } = require('../modules/InventoryManager');
const { createNewUser } = require('../modules/UserManager');
const { User } = require('../data/sequelizeModels/User');
const { EmailAlreadyExistsError } = require("../modules/errors")

const createUsersTest = async () => {


    const userOne = await createNewUser("firstName", "lastName", "1@email.com", "matchingpass");
    const userTwo = await createNewUser("firstName", "lastName", "2@email.com", "matchingpass");
    const p1 = userOne.password;
    const p2 = userTwo.password;
    console.log(`Check different passwords: ${p1 != p2}`);

    try {
        const UserThree = await createNewUser("firstName", "lastName", "3@email.com", "pass");
        const User4 = await createNewUser("firstName", "lastName", "3@email.com", "pass");
    } catch (EmailAlreadyExistsError) {
        console.log('Check cant create duplicate emails: PASS');
    }

}

exports.createUsersTest = createUsersTest;