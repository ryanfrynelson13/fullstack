const express = require('express')
const cors = require('cors')
const db = require('./data/database')
const port = process.env.PORT || 3000
const router = require('./routes/router')

const app = express()

app.use(cors())

app.use(express.json())

app.use('', router)

db.connectToDatabase()
    .then(() => {
        app.listen(port, console.log('le serveur est lancé sur le port 3000'))
    })
    .catch((err) => {
        console.log('failed to connect to database')
        console.log(err)
    })