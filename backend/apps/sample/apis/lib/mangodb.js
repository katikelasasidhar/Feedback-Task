const { MongoClient } = require(`${CONSTANTS.APPROOTDIR}/sample/3p/node_modules/mongodb`);
const ObjectID = require(`${CONSTANTS.APPROOTDIR}/sample/3p/node_modules/mongodb`).ObjectID;
const url = 'mongodb+srv://sasidhar:sasidhar@cluster0.trz16.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(url);
const dbName = 'feedback';

const getMongoDbCollection = async () => {
    try {
        // Use connect method to connect to the server
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection('feedbacks');
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