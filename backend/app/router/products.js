// const { DataTypes } = require('sequelize')

// const Product = require('./models/Product')(sequelize, DataTypes)

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
