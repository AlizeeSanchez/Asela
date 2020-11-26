const { Pool } = require('pg');

const db = new Pool({ connectionString: process.env.PG_URL });

module.exports = db;