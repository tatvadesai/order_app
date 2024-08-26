const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.MYSQL_PASSWORD, // Use environment variable for password
  database: 'order_app'  // Replace with your MySQL database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');

  // Create tables if they don't exist
  db.query(`CREATE TABLE IF NOT EXISTS sales (
      id INT AUTO_INCREMENT PRIMARY KEY,
      product VARCHAR(255),
      amount DECIMAL(10, 2),
      date DATE
  )`);
  db.query(`CREATE TABLE IF NOT EXISTS jama (
      id INT AUTO_INCREMENT PRIMARY KEY,
      amount DECIMAL(10, 2),
      date DATE
  )`);
  db.query(`CREATE TABLE IF NOT EXISTS baki (
      id INT AUTO_INCREMENT PRIMARY KEY,
      amount DECIMAL(10, 2),
      party VARCHAR(255),
      date DATE
  )`);
  db.query(`CREATE TABLE IF NOT EXISTS expenses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      description VARCHAR(255),
      amount DECIMAL(10, 2),
      date DATE
  )`);
});

module.exports = db;
