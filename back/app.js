const express = require('express')
const port = process.env.PORT || 3000

const app = express()

app.listen(port, console.log('le serveur est lancé sur le port 3000'))