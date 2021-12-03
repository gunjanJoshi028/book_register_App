const { MongoClient } = require(`${CONSTANTS.APPROOTDIR}/crud_app/3p/node_modules/mongodb`);
const ObjectID = require(`${CONSTANTS.APPROOTDIR}/crud_app/3p/node_modules/mongodb`).ObjectID;
const url = 'mongodb+srv://root:root@cluster0.4dsld.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(url);
const dbName = 'booksdb';

const getMongoDbCollection = async () => {
    try {
        // Use connect method to connect to the server
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection('books');
        if (collection) return collection;
        throw new Error('Unable to connect to mongodb');
    } catch (error) {
        throw error;
    }
}

module.exports = {
    ObjectID,
    getMongoDbCollection
}