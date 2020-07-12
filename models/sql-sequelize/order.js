const { Sequelize, DataTypes } = require('sequelize')

const sequelize = require('../../util/sequelize-database')

const Order = sequelize.define('order', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }
})

module.exports = Order