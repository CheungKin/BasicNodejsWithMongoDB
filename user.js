const {MongoClient} = require('mongodb');
const uri = 'mongodb+srv://kin:123321@cluster0.s4tlg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
//const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
var ObjectId = require('mongodb').ObjectId;

//List all users
exports.findAll = async () => {
    try {
        await client.connect();
        const db = client.db('user');
        const findResult = await db.collection('user').find({}).toArray();
        return findResult;
    } catch (e) {
        console.error(e);
    } finally {
        client.close();
    }
};

//Find one user by name
exports.findByName = async (name) => {
    try {
        await client.connect();
        const db = client.db('user');
        const findResult = await db.collection('user').findOne({'name': name});
        return findResult;
    } catch (e) {
        console.error(e);
    } finally {
        client.close();
    }
};

//Find one user by id
exports.findById = async (id) => {
    try {
        await client.connect();
        const db = client.db('user');
        const findResult = await db.collection('user').findOne({'_id': ObjectId(id)});
        return findResult;
    } catch (e) {
        console.error(e);
    } finally {
        client.close();
    }
};

//Create user
exports.insert = async (user) => {
    try {
        await client.connect();
        const db = client.db('user');
        const insertResult = await db.collection('user').insertOne(user);
        console.log(insertResult);
    } catch (e) {
        console.error(e);
    } finally {
        client.close();
    }
};

//Update user
exports.update = async (id, user) => {
    try {
        await client.connect();
        const db = client.db('user');
        const updateResult = await db.collection('user').updateOne({'_id': ObjectId(id)}, {$set: user});
        console.log(updateResult);
    } catch (e) {
        console.error(e);
    } finally {
        client.close();
    }
};


//Delete user
exports.delete = async (id) => {
    try {
        await client.connect();
        const db = client.db('user');
        const updateResult = await db.collection('user').deleteOne({'_id': ObjectId(id)});
        console.log(updateResult);
    } catch (e) {
        console.error(e);
    } finally {
        client.close();
    }
};