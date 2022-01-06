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

const upgradeMedics = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'upgradeMedics'
    })


}

const deleteMedics = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'deleteMedics'
    })


}


module.exports={
    getMedics,
    createMedics,
    upgradeMedics,
    deleteMedics
}