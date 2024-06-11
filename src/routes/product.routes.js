const { Router } = require('express')
const { check, param } = require('express-validator')
const ProductController = require('../controllers/product.controller')
const fieldValidator = require('../middlewares/fieldValidator')
const tokenValidator = require('../middlewares/tokenValidator')
const isOperatorUser = require('../middlewares/isOperatorUser')

const router = Router()

router.post(
  '/', 
  [
    tokenValidator,
    isOperatorUser,
    check('name', 'El nombre es obligatorio.').notEmpty(),
    check('description', 'La descripción es obligatoria.').notEmpty(),
    check('multimedia', 'Los archivos multimedia son obligatorios.').notEmpty().isArray(),
    check('price', 'El precio es obligatorio.').notEmpty().isNumeric(),
    fieldValidator
  ],
  ProductController.create
)

router.get('/:productId', [], ProductController.get)

router.get('/', [], ProductController.get)

router.patch(
  '/:productId', 
  [
    param('productId', 'El id de producto es obligatorio').not().isEmpty().isMongoId(),
    fieldValidator,
    tokenValidator,
    isOperatorUser
  ], 
  ProductController.update
)

router.delete(
  '/:productId',
  [
    param('productId', 'El id de producto es obligatorio').not().isEmpty().isMongoId(),
    fieldValidator,
    tokenValidator,
    isOperatorUser
  ],
  ProductController.deleteProduct
)

module.exports = router