const fs = require('fs')


const User = require('../models/user')
const Medic = require('../models/medics')
const Hospital = require('../models/hospital')

const deleteImg = ( path ) => {
    if ( fs.existsSync( path ) ) {
        fs.unlinkSync( path )
    }
}

const refreshImage  = async (type, id, nameFile) => {

    let pathOld = ''

    switch ( type ) {
        case 'medics':

            const medic = await Medic.findById(id)
            if ( !medic ) {
                return false
            }
            pathOld = `./uploads/medics/${ medic.img }`

            deleteImg( pathOld )
            

            medic.img = nameFile
            await medic.save()
            return true

        case 'hospitals':

            const hospital = await Hospital.findById(id)
            if ( !hospital ) {
                return false
            }
            pathOld = `./uploads/medics/${ hospital.img }`

            deleteImg( pathOld )
            

            hospital.img = nameFile
            await hospital.save()
            return true
            
        case 'users':

            const user = await User.findById(id)
            if ( !user ) {
                return false
            }
            pathOld = `./uploads/medics/${ user.img }`

            deleteImg( pathOld )
            

            user.img = nameFile
            await user.save()
            return true
            
        default:
            break;
    }


}

module.exports = {
    refreshImage
}