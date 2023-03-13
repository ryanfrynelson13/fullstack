const mongodb = require('mongodb')
const db = require('../data/database')

const User = {
    async findById(id) {
        const uid = new mongodb.ObjectId(id)
        const user = await db.getDb().collection('users').findOne({_id: uid})
        return user
    },

    async findAll() {
        const users = await db.getDb().collection('users').find({}).toArray()
        return users
    },

    async signup(user) {
        const newUser = await db.getDb().collection('users').insertOne(user)
        return newUser.insertedId.toString()
    },

    async findByEmail(email){
        const user = await db.getDb().collection('users').findOne({email: email})
        return user        
    },

    async alreadyExists(email) {
        const user = await this.findByEmail(email)
        return user? {exists: true, user} : {exists: false}
    },
    async matchPassword(user, password){
        return user.password === password
    }
}

module.exports = User