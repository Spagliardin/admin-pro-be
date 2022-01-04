
// Ruta: /api/users

const { Router } = require('express')
const { getUsers, createUser, upgradeUser, deleteUser } = require('../controllers/users')
const { check } = require('express-validator')
const { validateCampos } = require('../middlewares/validate-campos');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();


router.get("/", validateJWT , getUsers);

router.post("/", [
    check('name', 'El Nombre es obligatorio').not().isEmpty(),
    check('password', 'El Password es obligatorio').not().isEmpty(),
    check('email', 'El Email es obligatorio').isEmail(),
    validateCampos
] ,createUser);

router.put( '/:id', [
    validateJWT,
    check('name', 'El Nombre es obligatorio').not().isEmpty(),
    check('email', 'El Email es obligatorio').isEmail(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    validateCampos
] , upgradeUser )


router.delete( '/:id',validateJWT , deleteUser )





module.exports = router