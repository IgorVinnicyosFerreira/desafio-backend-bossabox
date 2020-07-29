require('dotenv').config({
  path: '.env.test'
});

const { Client } = require('pg');

const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
});

client.connect();

client.query(`CREATE DATABASE ${process.env.DB_NAME}`, error => {
  client.end();
  if (error) console.log(error);
  process.exit(0);
});
