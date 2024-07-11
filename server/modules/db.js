const { Sequelize } = require('sequelize');
const env = process.env;
const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USER, env.DATABASE_PASSWORD, {
    host: env.DATABASE_SERVER,
    dialect: 'mariadb',
    port: parseInt(env.DATABASE_PORT)
});

async function connectToDb() {
    try {
        await sequelize.authenticate();
        console.log('Connection to mariaDB has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

exports.connectToDb=connectToDb;