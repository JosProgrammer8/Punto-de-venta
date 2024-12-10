const sequelize = require('./config/sequelize')
const compression = require('compression')
const { ENV } = require('./config/env')
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

app.use((err, _req, res, _next) => {
    console.error(err.stack)

    return res.status(err.status ?? 500).json({
        status: 'ERR',
        message: err.message ?? 'Internal server error',
        data: null,
    })
})

app.use((_req, res, _next) => {
    return res.status(404).json({
        status: 'ERR',
        message: 'Ruta no encontrada',
        data: null,
    })
})

app.listen(ENV.PORT, ENV.HOST, async (err) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }

    try {
        await sequelize.authenticate()
        console.log(`Servidor corriendo en http://${ENV.HOST}:${ENV.PORT}`)
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error)
    }
})
