const { response } = require('express')
const User = require('../models/user')
const bcrypt = require("bcryptjs");
const { generateJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {

    try {

        const { email, password } = req.body;
        const userDB = await User.findOne({ email })
        
        // Verificar Email
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Invalid Email'
            })
        }

        // verificar Contraseña
        const validPassword = bcrypt.compareSync( password, userDB.password )
        if (!validPassword) {
            return response.status(400).json({
                ok: false,
                msg: 'Invalid Password'
            })
        }

        // Generate JWT

        const token = await generateJWT( userDB.id )


        res.json({
            ok: true,
            token
        })


        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error, Hable con el adm'
        })
    }



}


module.exports = {
    login
}