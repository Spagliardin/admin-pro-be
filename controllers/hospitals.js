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

const upgradeHospitals = async (req, res = response) => {

    const hospitalId = req.params.id
    const uid = req.uid

    try {

        const hospital = await Hospital.findById(hospitalId)

        if (!hospital) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado',
            })
        }

        const changesHospital = {
            ...req.body,
            user: uid
        }

        const hospitalUpgrade = await Hospital.findByIdAndUpdate(hospitalId, changesHospital, { new: true })

        res.json({
            ok: true,
            msg: 'Actualizar hospital',
            hospitalUpgrade
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error, hable con el admin'
        })
    }

    


}

const deleteHospitals = async (req, res = response) => {

    const hospitalId = req.params.id

    try {

        const hospital = await Hospital.findById(hospitalId)

        if (!hospital) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado',
            })
        }

        await Hospital.findByIdAndDelete( hospitalId )

        res.json({
            ok: true,
            msg: 'Hospital Eliminado'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error, hable con el admin'
        })
    }

}


module.exports={
    getHospitals,
    createHospitals,
    upgradeHospitals,
    deleteHospitals
}