const { Router } = require('express')
const RecordController = require('../controllers/record.controller')

const router = Router()

router.get('/:productId', [], RecordController.get)

module.exports = router