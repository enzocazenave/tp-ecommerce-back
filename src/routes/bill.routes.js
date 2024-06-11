const { Router } = require('express')
const tokenValidator = require('../middlewares/tokenValidator')
const fieldValidator = require('../middlewares/fieldValidator')
const { param } = require('express-validator')
const BillController = require('../controllers/bill.controller')

const router = Router()

router.get(
  '/order/:orderId', 
  [
    param('orderId', 'La id de la orden es obligatoria').not().isEmpty().isInt(),
    fieldValidator,
    tokenValidator
  ],
  BillController.getBillByOrderId
)

router.get(
  '/orders', 
  [
    tokenValidator
  ],
  BillController.getBillsOfUser
)

module.exports = router