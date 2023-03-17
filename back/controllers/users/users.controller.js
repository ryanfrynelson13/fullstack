const User = require('../../models/user.model')
const { generateJWT } = require('../../utils/jwt-utils')

const tokenGenerator = (user) => {
    return generateJWT({
        _id: user._id,
        email: user.email
    })
}

const usersController = {

    async getOne (req, res){
        const id = req.user.id
        const searchedUser = await User.findById(id)
        res.json(searchedUser)
    },

    async getAll (req, res){
        const users = await User.findAll() 
        console.log(users[0])    
        res.json(users)
    },

    async signup (req, res){
        const newUser = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            birthdate: '1997-07-21T00:03:13.000Z'
        }
        const {exists} = await User.alreadyExists(req.body.email)
        if(exists) return res.send('user already exists')
        const id = await User.signup(newUser)
        const token = await tokenGenerator({_id: id, email: newUser.email})
        res.json(token)
    },

    async login (req, res){
        const email = req.body.email
        const password = req.body.password
    
        const userInfo = await User.alreadyExists(email)
        if(!userInfo.exists){
            res.json({validated: false})
            return
        }
        const checkPassword = await User.matchPassword(userInfo.user, password)
        if(!checkPassword){
            res.json({validated: false})
            return        
        }

        const token = await tokenGenerator(userInfo.user)
        res.json({validated: true, payload: token})
    
    }
}

module.exports = usersController