const Joi = require('joi')

const createProductSchema = Joi.object({
    name: Joi.string().required(),
    unit_price: Joi.number().required(),
    stock: Joi.number().required(),
}).required()

const updateProductSchema = Joi.object({
    name: Joi.string(),
    unit_price: Joi.number(),
    stock: Joi.number(),
})

module.exports = {
    createProductSchema,
    updateProductSchema,
}
