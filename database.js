const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./sales.db');

db.serialize(() => {
    // Create Sales table
    db.run(`CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product TEXT,
        amount INTEGER,
        date TEXT
    )`);

    // Create Jama table
    db.run(`CREATE TABLE IF NOT EXISTS jama (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount INTEGER,
        date TEXT
    )`);

    // Create Baki table
    db.run(`CREATE TABLE IF NOT EXISTS baki (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount INTEGER,
        party TEXT,
        date TEXT
    )`);

    // Create Expenses table
    db.run(`CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT,
        amount INTEGER,
        date TEXT
    )`);
});

module.exports = db;
