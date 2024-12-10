const { notFound, errorHandler } = require('../middlewares/global')
const productsRoutes = require('./products')
const expressApp = require('../../config/express')

expressApp.use('/api/v1/products', productsRoutes)

expressApp.use(notFound)

expressApp.use(errorHandler)

module.exports = expressApp
