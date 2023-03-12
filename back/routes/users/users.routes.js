const express = require('express')
const usersController = require('../../controllers/users/users.controller')
const { authentificateJWT } = require('../../middlewares/auth.middleware')

const usersRouter = express.Router()

usersRouter.get('/', usersController.getAll)

usersRouter.get('/profil', authentificateJWT,usersController.getOne)

usersRouter.post('/', usersController.signup)

usersRouter.post('/login', usersController.login)

module.exports = usersRouter