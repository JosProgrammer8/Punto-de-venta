const {
    createProductSchema,
    updateProductSchema,
} = require('../validations/products')
const sequelize = require('../../config/sequelize')
const { DataTypes } = require('sequelize')

const Product = require('../models/Product')(sequelize, DataTypes)

async function index(_request, response) {
    const products = await Product.findAll({
        order: [['id', 'DESC']],
    })

    return response.status(200).json({
        status: 'OK',
        message: 'List of products',
        data: products,
    })
}

async function show(request, response) {
    const product = await Product.findByPk(request.params.id)

    if (!product) {
        return response.status(404).json({
            status: 'ERR',
            message: 'Product not found',
            data: null,
        })
    }

    return response.status(200).json({
        status: 'OK',
        message: 'Product found',
        data: product,
    })
}

async function create(request, response) {
    const { error, value } = createProductSchema.validate(request.body)

    if (error) {
        return response.status(400).json({
            status: 'ERR',
            message: error.message,
            data: null,
        })
    }

    const product = await Product.create(value)

    return response.status(201).json({
        status: 'OK',
        message: 'Product created',
        data: product,
    })
}

async function update(request, response) {
    const { error, value } = updateProductSchema.validate(request.body)

    if (error) {
        return response.status(400).json({
            status: 'ERR',
            message: error.message,
            data: null,
        })
    }

    const product = await Product.findByPk(request.params.id)

    if (!product) {
        return response.status(404).json({
            status: 'ERR',
            message: 'Product not found',
            data: null,
        })
    }

    await product.update(value)

    return response.status(200).json({
        status: 'OK',
        message: 'Product updated',
        data: product,
    })
}

async function remove(request, response) {
    const product = await Product.findByPk(request.params.id)

    if (product) {
        await product.update({ active: !product.active })
    }

    return response.status(200).json({
        status: 'OK',
        message: 'Product status updated',
        data: null,
    })
}

module.exports = {
    index,
    show,
    create,
    update,
    remove,
}
