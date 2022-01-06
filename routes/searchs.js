// path: '/api/login"


const { Router } = require('express')
const { getAll, getDocumentsColeccion } = require('../controllers/searchs')
const { validateJWT } = require('../middlewares/validate-jwt')


const router = Router()

router.get( '/:searchs', validateJWT , getAll )
router.get( '/coleccion/:table/:search', validateJWT , getDocumentsColeccion )





module.exports = router