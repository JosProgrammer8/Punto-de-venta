const compression = require('compression')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')

const appConfig = express()

appConfig.use(morgan('combined'))
appConfig.use(express.json())
appConfig.use(compression())
appConfig.use(helmet())
appConfig.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }),
)

module.exports = appConfig
