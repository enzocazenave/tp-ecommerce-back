const { Router } = require('express')
const tokenValidator = require('../middlewares/tokenValidator')
const fieldValidator = require('../middlewares/fieldValidator')
const PaymentsController = require('../controllers/payments.controller')
const { check, param } = require('express-validator')

const router = Router()

router.post(
  '/pay/:orderId', 
  [
    param('orderId', 'El id de orden es obligatoria').not().isEmpty().isInt(),
    check('paymentMethod', 'El método de pago no es válido').notEmpty().toUpperCase().isIn(["TARJETA", "EFECTIVO", "CUENTA_CORRIENTE"]),
    fieldValidator,
    tokenValidator
  ],
  PaymentsController.payOrder
)

module.exports = router