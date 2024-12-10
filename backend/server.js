const {
    ENV: { HOST, PORT },
} = require('./config/env')
const sequelize = require('./config/sequelize')
const app = require('./app/router/index')

app.listen(PORT, HOST, async (err) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }

    try {
        await sequelize.authenticate()
        console.log(`Servidor corriendo en http://${HOST}:${PORT}`)
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error)
    }
})
