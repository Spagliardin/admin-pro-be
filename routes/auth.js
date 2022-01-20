// path: '/api/login"


const { Router } = require('express')
const { check } = require('express-validator')
const { login, googleSignIn } = require('../controllers/auth')
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

router.post( '/google',
    [
        check('token', 'El token es obligatorio').not().isEmpty(),
        validateCampos 
    ],
    googleSignIn
)




module.exports = router