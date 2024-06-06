const { Router } = require('express')
const RecordController = require('../controllers/record.controller')
const tokenValidator = require('../middlewares/tokenValidator')
const isOperatorUser = require('../middlewares/tokenValidator')
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

module.exports = router