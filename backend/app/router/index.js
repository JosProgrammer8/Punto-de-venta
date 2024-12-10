const { notFound, errorHandler } = require('../middlewares/global')
const expressApp = require('../../config/express')
const productsRoutes = require('./products')

expressApp.use('/api/v1/products', productsRoutes)

expressApp.use(notFound)

expressApp.use(errorHandler)

module.exports = expressApp
