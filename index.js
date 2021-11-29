require('dotenv').config()

const express = require("express");
const cors = require('cors')

const { dbConnection } = require('./db/config')

//crear el servidor
const app = express();

// CORS

app.use( cors() )

// DB
dbConnection()

//Routes
app.get("/", (req, res) => {
  res.json({
    ok: true,
    msg: "Hola Mundo",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendto en puerto " + 3000);
});

// user: mean_user
// pass: smQRyqLsA1zGaJGT
