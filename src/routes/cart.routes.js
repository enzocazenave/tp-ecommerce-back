const { Router } = require('express')
const { check } = require('express-validator')
const CartController = require('../controllers/cart.controller')
const tokenValidator = require('../middlewares/tokenValidator')
const fieldValidator = require('../middlewares/fieldValidator')

const router = Router()

router.put(
  '/add', 
  [
    check('productId', 'El id de producto es obligatorio').not().isEmpty().isMongoId(),
    check('quantity', 'La cantidad de unidades del producto es obligatoria').not().isEmpty().isInt({ min: 1 }),
    fieldValidator,
    tokenValidator
  ], 
  CartController.addProduct
)

router.delete(
  '/remove',
  [
    check('productId', 'El id de producto es obligatorio').not().isEmpty().isMongoId(),
    check('quantity', 'La cantidad de unidades del producto es obligatoria').not().isEmpty().isInt({ min: 1 }),
    fieldValidator,
    tokenValidator
  ],
  CartController.removeProduct
)

router.get('/', tokenValidator, CartController.getCart)

module.exports = router