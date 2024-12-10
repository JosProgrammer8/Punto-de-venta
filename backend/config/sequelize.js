const { Sequelize } = require('sequelize')
const config = require('./config.json')
const { ENV } = require('./env')

const sequelize = new Sequelize({
    ...config[ENV.NODE_ENV],
    logging: false,
})

module.exports = sequelize
