const { Sequelize, DataTypes } = require('sequelize')
const constants = require('./utils/constants')
const config = require('./config/config.json')
const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

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

const sequelize = new Sequelize(config[entorno])

// const Product = require('./models/product')(sequelize, DataTypes)

// sequelize.sync()

// app.get('/products', async (_req, res) => {
//     const products = await Product.findAll()

//     return res.status(200).json({
//         status: 'OK',
//         message: 'List of products',
//         data: products,
//     })
// })

// app.post('/products', async (req, res) => {
//     try {
//         const { name, price, stock, imageUrl } = req.body
//         const product = await Product.create({ name, price, stock, imageUrl })
//         res.json(product)
//     } catch (error) {
//         console.error('Error creating product:', error)
//         res.status(500).send('Error creating product')
//     }
// })

// app.put('/products/:id', async (req, res) => {
//     try {
//         const product = await Product.findByPk(req.params.id)
//         if (product) {
//             await product.update(req.body)
//             res.json(product)
//         } else {
//             res.status(404).send('Producto no encontrado')
//         }
//     } catch (error) {
//         console.error('Error updating product:', error)
//         res.status(500).send('Error updating product')
//     }
// })

// app.delete('/products/:id', async (req, res) => {
//     try {
//         const product = await Product.findByPk(req.params.id)
//         if (product) {
//             await product.destroy()
//             res.sendStatus(204)
//         } else {
//             res.status(404).send('Producto no encontrado')
//         }
//     } catch (error) {
//         console.error('Error deleting product:', error)
//         res.status(500).send('Error deleting product')
//     }
// })

const HOST = constants.HOST[entorno]
const PORT = constants.PORT[entorno]

app.listen(PORT, HOST, (err) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }

    console.log(`Servidor corriendo en http://${HOST}:${PORT}`)
})
