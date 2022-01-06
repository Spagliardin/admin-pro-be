const path = require('path')
const fs = require('fs')


const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { refreshImage } = require("../helpers/refreshImage");



const fileUpload = (req, res = response) => {

    const type = req.params.type
    const id = req.params.id

    const validType = ['hospitals', 'medics', 'users']
    if (!validType.includes(type)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es medico, usuario u hospital(type)'
        })
    }

    // valid exist file
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        })
    }

    // procesar file
    const file = req.files.imagen

    const nameCut = file.name.split('.')
    const extensionFile = nameCut[ nameCut.length - 1 ]

    //validate Extension
    const extensionValid = ['png', 'jpg', 'jpeg', 'gif']
    if (!extensionValid.includes( extensionFile )) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida'
        })
    }

    //generate file name
    const nameFile = `${ uuidv4() }.${extensionFile}`

    //path para guardar la imagen
    const path = `./uploads/${ type }/${ nameFile }`

    file.mv(path, (err) => {
        if (err){
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'No se movio bien el archivo'
            });
        }

        //Actualizar DB
        refreshImage(type, id, nameFile);
    
        res.json({
            ok: true,
            msg: 'Archivo subido exitosamente',
            nameFile
        })
      });


    


}


const returnImage = (req, res = response) => {

    const type = req.params.type
    const img = req.params.image


    const pathImg = path.join( __dirname, `../uploads/${ type }/${ img }` )

    // imagen por defecto
    if ( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg ) 
    } else {
        res.json({
            ok: false,
            msg: 'No hay imagen'
        })
    }


}


module.exports = {
    fileUpload,
    returnImage
}