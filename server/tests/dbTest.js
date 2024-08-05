const { } = require('../modules/InventoryManager');
const { createNewUser } = require('../modules/UserManager');
const { User } = require('../data/sequelizeModels/User');
const { EmailAlreadyExistsError } = require("../modules/errors")
const {createItemInCatalogue, addItemToInventory} = require('../modules/InventoryManager');

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

const createTestItems = async () => {
    await createItemInCatalogue(`item 1`, 100, `brand 1`, `desc`, "imgUrl", 100);
    await createItemInCatalogue(`item 2`, 100, `brand 1`, `desc`, "imgUrl", 100);
    await createItemInCatalogue(`item 3`, 100, `brand 2`, `desc`, "imgUrl", 100);
    await createItemInCatalogue(`item 4`, 100, `brand 2`, `desc`, "imgUrl", 100);
    await createItemInCatalogue(`item 5`, 100, `brand 3`, `desc`, "imgUrl", 100);
    await createItemInCatalogue(`item 6`, 100, `brand 3`, `desc`, "imgUrl", 100);
    await createItemInCatalogue(`item 7`, 100, `brand 4`, `desc`, "imgUrl", 100);

}

exports.createUsersTest = createUsersTest;
exports.createTestItems = createTestItems;