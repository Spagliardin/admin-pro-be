// '/api/hospital'



// Ruta: /api/users

const { Router } = require('express')
const { check } = require('express-validator')
const { validateCampos } = require('../middlewares/validate-campos');
const { validateJWT } = require('../middlewares/validate-jwt');

const {
    getHospitals,
    createHospitals,
    upgradeHospitals,
    deleteHospitals
} = require('../controllers/hospitals')

const router = Router();


router.get("/", getHospitals);

router.post("/", [
    validateJWT,
    check('name', 'El nombre del hospital es necesario').not().isEmpty(),
    validateCampos

] ,createHospitals);

router.put( '/:id', [
    
] , upgradeHospitals )


router.delete( '/:id', deleteHospitals )





module.exports = router