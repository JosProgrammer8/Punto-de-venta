const config = require('./config/config.json')
const constants = require('./utils/constants')
const { Sequelize } = require('sequelize')
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

let entorno = constants.ENV.prod

const args = process.argv

if (args.length <= 2) {
    throw new Error(`Parametro '--entorno' requerido`)
}

args.forEach((argument) => {
    const arg = argument.toLowerCase()

    if (arg.startsWith('--entorno=')) {
        let valor = arg.replace('--entorno=', '').trim()

        entorno = constants.ENV[valor]

        if (!entorno) {
            throw new Error(`Entorno '${valor}' no es válido`)
        }
    }
})

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

const sequelize = new Sequelize({
    ...config[entorno],
    logging: false,
})

const HOST = constants.HOST[entorno]
const PORT = constants.PORT[entorno]

app.listen(PORT, HOST, async (err) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }

    try {
        await sequelize.authenticate()

        console.log('Conexión establecida con la base de datos')
        console.log(`Servidor corriendo en http://${HOST}:${PORT}`)
    } catch (error) {
        console.error('Error:', error)
    }
})
