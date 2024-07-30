require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.v602xxx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`);

module.exports = mongoose.connection;