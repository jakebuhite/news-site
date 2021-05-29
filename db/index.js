const { dbConfig } = require('../config/database');
require("dotenv").config();

const { Pool } = require("pg");
const isProduction = process.env.NODE_ENV == "production";
const connectionString = `postgresql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: isProduction
});

module.exports = { pool };