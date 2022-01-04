// path: '/api/login"


const { Router } = require('express')
const { check } = require('express-validator')
const { login } = require('../controllers/auth')
const { validateCampos } = require('../middlewares/validate-campos')


const router = Router()

router.post( '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check( 'password', 'El password es obligatorio' ).not().isEmpty(),
        validateCampos 
    ],
    login
)




module.exports = router