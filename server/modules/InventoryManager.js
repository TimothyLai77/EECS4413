const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const { Item } = require('../data/sequelizeModels/Item');
const { Inventory } = require('../data/sequelizeModels/Inventory');
const uniqid = require('uniqid');
const { OutOfStockError } = require('../modules/errors')

/**
 * Creates the item in the Item table, does not add to the inventory
 * @param {*} itemName Name of the item
 * @param {*} itemPrice price of the item
 */
const createItemInCatalogue = async (itemName, itemPrice, itemBrand, itemDescription, image, stock) => {
    // create the item in an item database
    const itemId = uniqid('item-');
    await Item.create({
        itemId: itemId,
        name: itemName,
        price: itemPrice,
        brand: itemBrand,
        description: itemDescription,
        image: image,
    });
    await Inventory.create({ itemId: itemId, quantity: stock });
};

/**
 * Add quantity of items to the inventory table, if the item does not exist in inventory
 * create it and set the quantity to quantity. Else add the quantity
 * @param {*} itemModel The actual Model of the item to add
 * @param {*} quantity quantity to add by
 */
const addItemToInventory = async (itemModel, quantity) => {
    const itemIdToAdd = itemModel.itemId;
    // check for duplicate
    const inventoryEntry = await Inventory.findByPk(itemIdToAdd);

    if (!inventoryEntry) {
        // if item does not exist in the inventory
        await Inventory.create({
            itemId: itemIdToAdd,
            quantity: quantity
        })
    } else {
        // item already exists, ADD the new quantity to the existing quantity
        inventoryEntry.quantity += quantity;
        await inventoryEntry.save();
    }
};

/**
 * Remove Item from inventory if there is enough it will remove
 * if not enough then throw error
 * @param {*} itemModel 
 * @param {*} quantityToRemove 
 */
const removeItemFromInventory = async (itemModel, quantityToRemove) => {
    const itemIdToRemove = itemModel.itemId;
    // grab the inventoryEntry and see if it exists
    const inventoryEntry = await Inventory.findByPk(itemIdToRemove);
    if (inventoryEntry) {
        // if the item exists and sufficient quantity exists
        const currentQuantity = inventoryEntry.quantity;
        if (currentQuantity < quantityToRemove) {
            throw new OutOfStockError(`Not enough items in inventory. Current stock: ${currentQuantity}. Atttempted to remove: ${quantityToRemove}`);
        } else {
            inventoryEntry.quantity -= quantityToRemove;
            await inventoryEntry.save();
        }
    }

};

const updateItemFromCatalogue = async({itemId, newItemName, newItemPrice, newItemBrand, newItemDescription, newImage, newStock}) => {
        // create the item in an item database
        const itemToUpdate = await Item.findByPk(itemId, {
            include: Inventory
        });
        if(!itemToUpdate) throw new Error("item does not exist");
        itemToUpdate.name = newItemName;
        itemToUpdate.price = newItemPrice;
        itemToUpdate.brand = newItemBrand;
        itemToUpdate.description = newItemDescription;
        itemToUpdate.image = newImage;
        await itemToUpdate.save();

        // update stock
        itemToUpdate.Inventory.quantity = newStock;
        await itemToUpdate.Inventory.save();
}


// https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/#eager-loading-filtered-at-the-associated-model-level
const searchForItem = async (searchTerm) => {
    // Gets all the Inventory rows with an ItemModel attached, 
    // WHERE ItemModel name OR brand is 'like' the searchTerm
    const invSearchResult = await Inventory.findAll({
        include: {
            model: Item,
            where: {
                // add inside this obj to increase search scope
                [Op.or] :{
                    name: {
                        [Op.like] : '%'+searchTerm+'%'
                    },
                    brand: {
                        [Op.like] : '%'+searchTerm+'%'
                    }
                }

            }
        }
    })

    return invSearchResult;
}
/**
 * Remove an item from the catalogue
 * @param {*} itemModel 
 */
// const removeItemFromCatalogue = async (itemModel) => {
//     // check that the item exists in the catalogue
//     const itemEntry = await Item.findByPk(itemModel.itemId);
//     if (itemEntry) {
//         // itemId exists in the catalogue
//         await itemEntry.destroy();
//     } else {
//         throw new Error("Item does not exist in the catalogue");
//     }
// }

exports.createItemInCatalogue = createItemInCatalogue;
exports.addItemToInventory = addItemToInventory;
exports.removeItemFromInventory = removeItemFromInventory;
exports.updateItemFromCatalogue = updateItemFromCatalogue;
exports.searchForItem = searchForItem;