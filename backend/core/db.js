const Sequelize = require('sequelize')

module.exports = new Sequelize(
    'zoo',
    'postgres',
    'postgres',
    {
        dialect: "postgres",
        host: 'localhost',
        port: 6401
    }
)