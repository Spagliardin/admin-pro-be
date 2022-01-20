// path: '/api/login"


const { Router } = require('express')
const { check } = require('express-validator')
const { login, googleSignIn, renewToken } = require('../controllers/auth')
const { validateCampos } = require('../middlewares/validate-campos')
const { validateJWT } = require('../middlewares/validate-jwt')


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

router.get( '/renew',
    validateJWT,
    renewToken
)




module.exports = router