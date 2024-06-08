const { Router } = require('express')
const OrderController = require('../controllers/order.controller')
const tokenValidator = require('../middlewares/tokenValidator')

const router = Router()

router.post('/create', tokenValidator, OrderController.createOrder)

module.exports = router