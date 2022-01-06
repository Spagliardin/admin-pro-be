require('dotenv').config()

const express = require("express");
const cors = require('cors')

const { dbConnection } = require('./db/config')

//crear el servidor
const app = express();

// CORS

app.use( cors() )

//reed and parse body

app.use( express.json() )

// DB
dbConnection()

//Routes
app.use('/api/users', require('./routes/users'))
app.use('/api/hospital', require('./routes/hospital'))
app.use('/api/all', require('./routes/searchs'))
app.use('/api/medics', require('./routes/medics'))
app.use('/api/login', require('./routes/auth'))
app.use('/api/upload', require('./routes/uploads'))




app.listen(process.env.PORT, () => {
  console.log("Servidor corriendto en puerto " + 3000);
});

// user: mean_user
// pass: smQRyqLsA1zGaJGT
