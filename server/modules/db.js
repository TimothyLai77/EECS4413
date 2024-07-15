const { Sequelize } = require('sequelize');
const env = process.env;
const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USER, env.DATABASE_PASSWORD, {
    host: env.DATABASE_SERVER,
    dialect: 'mariadb',
    port: parseInt(env.DATABASE_PORT)
});

async function connectToDb(modelList) {
    try {
        await sequelize.authenticate();
        console.log('Connection to mariaDB has been established successfully.');

        //syncing and initialize all models
        // Basically for loops through the entire model list, and syncs it with the database.
        await Promise.all(modelList.map(async (model) => {
            await model.sync()
            console.log(model.getTableName() + " synced")
        }));
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

exports.connectToDb = connectToDb;
exports.appDatabase = sequelize;