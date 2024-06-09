const { Router } = require('express')
const OrderController = require('../controllers/order.controller')
const tokenValidator = require('../middlewares/tokenValidator')

const router = Router()

router.post('/create', tokenValidator, OrderController.createOrder)

router.get('/', tokenValidator, OrderController.getUserOrders)

router.get('/:orderId', tokenValidator, OrderController.getUserOrders)

module.exports = router