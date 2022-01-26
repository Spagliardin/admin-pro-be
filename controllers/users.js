const { response } = require("express");
const { generateJWT } = require('../helpers/jwt');
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {

  const desde = Number(req.query.desde) || 0;


  const [ users, total ] = await Promise.all([
    User.find({}, "name email role google img")
        .skip( desde )
         .limit( 5 ),

    User.countDocuments(),
  ])

  res.json({
    ok: true,
    users,
    total
  });
};

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const duplicateEmail = await User.findOne({ email });

    if (duplicateEmail) {
      return res.status(400).json({
        ok: false,
        msg: "Correo ya registrado",
      });
    }

    const user = new User(req.body);

    // Encriptar pass

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    const token = await generateJWT( user.id )

    res.json({
      ok: true,
      user,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

const upgradeUser = async (req, res = response) => {

  const uid = req.params.id;

  try {
    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese id",
      });
    }
    const { password, google, email, ...campos } = req.body;

    if (userDB.email !== req.body.email) {
      const existEmail = await User.findOne({ email })
      if (existEmail) {
        return res.status(400).json({
          ok: false,
          msg: 'Ya existe un usuario con ese email'
        })
      }
    }

    if ( !userDB.google ) {
      campos.email = email
    } else if ( userDB.email !== email ){
      return res.status(400).json({
        ok: false,
        msg: 'User google can`t change'
      })
    }

    // Upgrade
    const userUpgrade = await User.findByIdAndUpdate(uid, campos, { new: true });

    res.json({
      ok: true,
      userUpgrade,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};


const deleteUser = async(req, res = response) => {

  const uid = req.params.id

  try {

    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese id",
      });
    }

    await User.findByIdAndDelete( uid )

    res.json({
      ok: true,
      mgs: 'User eliminados'
    })

    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      mgs: 'Recurra al administrador'
    })
  }


}

module.exports = {
  getUsers,
  createUser,
  upgradeUser,
  deleteUser
};
