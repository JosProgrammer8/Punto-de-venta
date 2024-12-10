const { errorHandler, notFound } = require('../app/middlewares/global')
const compression = require('compression')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(morgan('combined'))
app.use(express.json())
app.use(compression())
app.use(helmet())
app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }),
)

app.use(errorHandler)

app.use(notFound)

module.exports = app
