const { response }  = require('express')
const Hospital = require('../models/hospital')


const getHospitals = async (req, res = response) => {
    
    const hospitals = await Hospital.find()
                                    .populate('user', 'name img')

    res.json({
        ok: true,
        hospitals
    })


}

const createHospitals = async (req, res = response) => {

    const uid = req.uid
    const hospital = new Hospital( { 
        user: uid,
        ...req.body
     } )

    try {

        const hospitalDB = await hospital.save()

        res.json({
            ok: true,
            hospital: hospitalDB
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el adm'
        })
    }



}

const upgradeHospitals = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'getHospitials'
    })


}

const deleteHospitals = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'getHospitials'
    })


}


module.exports={
    getHospitals,
    createHospitals,
    upgradeHospitals,
    deleteHospitals
}