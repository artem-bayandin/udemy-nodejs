const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let _db

const mongoConnect = cb => {
    MongoClient
        .connect(
            'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false'
            , {
                useUnifiedTopology: true
            }
        )
        .then(client => {
            console.log('db connected')
            _db = client.db()
            cb(client)
        })
        .catch(err => {
            console.log(err)
            throw err
        })
}

const getDb = () => {
    if (_db) return _db
    throw 'No DB found'
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb