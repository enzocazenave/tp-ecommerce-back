const { Router } = require('express')
const RecordController = require('../controllers/record.controller')
const tokenValidator = require('../middlewares/tokenValidator')
const isOperatorUser = require('../middlewares/tokenValidator')


const router = Router()

router.get(
  '/products/:productId', 
  [
    tokenValidator,
    isOperatorUser
  ], 
  RecordController.getRecordsByProductId
)

router.get('/cart', tokenValidator, RecordController.getCartRecords)

module.exports = router