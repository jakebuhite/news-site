const { dbConfig } = require('../config/database');

const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;

const pool = new Pool({
    connectionString: connectionString,
    ssl: isProduction
});

module.exports = { pool };