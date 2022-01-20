const { response } = require('express')
const User = require('../models/user')
const bcrypt = require("bcryptjs");
const { generateJWT } = require('../helpers/jwt');
const { googleVertfy } = require('../helpers/google-verify');

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

const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token

    try {

        const { name, email, picture } = await googleVertfy( googleToken )

        const userDB = await User.findOne({ email })
        let user;

        if (!userDB) {
            user = new User({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else {

            user = userDB,
            user.google = true;
            user.password = '@@@'

        }

        await user.save()

        const token = await generateJWT( user.id )


        res.json({
            ok: true,
            token
        })

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token incorrecto',
        })
    }

    
}


module.exports = {
    login,
    googleSignIn
}