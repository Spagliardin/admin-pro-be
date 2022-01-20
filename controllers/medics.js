const { response }  = require('express')
const Medic = require('../models/medics')


const getMedics = async (req, res = response) => {

    const medics = await Medic.find()
                               .populate('user', 'name img')
                               .populate('hospital', 'name img')

    res.json({
        ok: true,
        medics
    })


}

const createMedics = async (req, res = response) => {

    const uid = req.uid
    const medico = new Medic({
        user: uid,
        ...req.body
    })

    try {

        const medicDB = await medico.save()

        res.json({
            ok: true,
            medic: medicDB
        })
        
    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: 'Hable con el adm'
        })


    }



}

const upgradeMedics = async(req, res = response) => {

    const id = req.params.id
    const uid = req.uid

    try {

        const medic = await Medic.findById(id)

        if (!medic) {
            return res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id',
            })
        }

        const changesMedic = {
            ...req.body,
            user: uid
        }

        const medicUpgrade = await Medic.findByIdAndUpdate(id, changesMedic, { new: true })

        res.json({
            ok: true,
            msg: 'Actualizar hospital',
            medicUpgrade
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error, hable con el admin'
        })
    }


}

const deleteMedics = async(req, res = response) => {

    const id = req.params.id

    try {

        const medic = await Medic.findById(id)

        if (!medic) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado',
            })
        }

        await Medic.findByIdAndDelete( id )

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
    getMedics,
    createMedics,
    upgradeMedics,
    deleteMedics
}