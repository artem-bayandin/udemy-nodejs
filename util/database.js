const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('udemynodejs', 'admin', 'admin', {
    host: 'localhost',
    dialect: 'mysql',
    // port: 1434
})

module.exports = sequelize