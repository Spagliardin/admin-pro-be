// '/api/medics'


const { Router } = require('express')
const { check } = require('express-validator')
const { validateCampos } = require('../middlewares/validate-campos');
const { validateJWT } = require('../middlewares/validate-jwt');

const {
    getMedics,
    createMedics,
    upgradeMedics,
    deleteMedics
} = require('../controllers/medics')

const router = Router();


router.get("/", getMedics);

router.post("/", [
    validateJWT,
    check('name', 'El nombre del medico es necesario').not().isEmpty(),
    check('hospital', 'El HospitalId debe ser valido').isMongoId(),
    validateCampos
] ,createMedics);

router.put( '/:id', [
    
] , upgradeMedics )


router.delete( '/:id', deleteMedics )





module.exports = router