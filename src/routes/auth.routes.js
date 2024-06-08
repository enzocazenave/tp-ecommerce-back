const { Router } = require('express')
const { check } = require('express-validator')
const AuthController = require('../controllers/auth.controller')
const fieldValidator = require('../middlewares/fieldValidator')
const tokenValidator = require('../middlewares/tokenValidator')

const router = Router()

router.post(
  '/register', 
  [
    check('name', 'El nombre es obligatorio.').notEmpty(),
    check('lastName', 'El apellido es obligatorio.').notEmpty(),
    check('address', 'La dirección es obligatoria.').notEmpty(),
    check('dni', 'El documento nacional de identidad es obligatorio.').notEmpty().isInt(),
    check('email', 'El correo electrónico es obligatorio').notEmpty().isEmail(),
    check('role', 'El rol es obligatorio.').notEmpty().isInt({ min: 1, max: 2 }),
    check('password', 'La contraseña es obligatoria y debe tener como mínimo 6 caracteres.').notEmpty().isLength({ min: 6 }),
    fieldValidator
  ],
  AuthController.register
)

router.post(
  '/login', 
  [
    check('email', 'El correo electrónico es obligatorio').notEmpty().isEmail(),
    check('password', 'La contraseña es obligatoria y debe tener como mínimo 6 caracteres.').notEmpty().isLength({ min: 6 }),
    fieldValidator
  ],
  AuthController.login
)

router.delete('/logout', tokenValidator, AuthController.logout)

router.get('/renew', tokenValidator, AuthController.validate)

module.exports = router