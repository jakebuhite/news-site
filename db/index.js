const { Client } = require('pg');
const { dbConfig } = require("./config");

module.exports = {
    query: (text, params, callback) => {
        return client.query(text, (err, res) => {
            callback(err, res);
        });
    },
    
    getClient: (callback) => {
        const client = new Client(dbConfig);
        client.connect((err, client, done) => {
            callback(err, client, done);
        });
    }
};