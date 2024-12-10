const {
    index,
    create,
    update,
    remove,
} = require('../controllers/ProductsController')
const router = require('express').Router()

router.get('/', index)

router.post('/', create)

router.put('/:id', update)

router.delete('/:id', remove)

module.exports = router
