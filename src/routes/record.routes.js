const { Router } = require('express')
const RecordController = require('../controllers/record.controller')
const tokenValidator = require('../middlewares/tokenValidator')
const isOperatorUser = require('../middlewares/isOperatorUser')
const { param } = require('express-validator')
const fieldValidator = require('../middlewares/fieldValidator')

const router = Router()

router.get(
  '/products/:productId', 
  [
    param('productId', 'El id de producto es obligatorio').not().isEmpty().isMongoId(),
    fieldValidator,
    tokenValidator,
    isOperatorUser
  ], 
  RecordController.getRecordsByProductId
)

router.get('/cart', tokenValidator, RecordController.getCartRecords)

router.put(
  '/cart/status/:cartRecordId', 
  [
    param('cartRecordId', 'El id de estado anterior de carrito es obligatorio').not().isEmpty().isMongoId(),
    fieldValidator,
    tokenValidator
  ], 
  RecordController.returnToPreviousStatuses
)

module.exports = router