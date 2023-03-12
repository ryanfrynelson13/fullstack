const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

let database

const connectToDatabase = async () => {
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017')
    database = client.db('fullstack')
} 

const getDb = () => {
    if(!database) {
        throw new Error('You must connect first')
    }

    return database
}

module.exports = {
    connectToDatabase,
    getDb
}