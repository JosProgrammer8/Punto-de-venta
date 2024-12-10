const dotenv = require('dotenv/config')
const Joi = require('joi')

const schema = Joi.object({
    HOST: Joi.string().required(),
    PORT: Joi.number().required(),
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .required(),
    DB_FILE: Joi.string().required(),
}).unknown(true)

const { error, value } = schema.validate(process.env)

if (error) {
    throw new Error(
        `Error en la validación de variables de entorno: ${error.message}}`,
    )
}

module.exports = {
    ENV: value,
}
