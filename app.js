const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 3000;

// Initialize SQLite database
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");

    // Create tables if they don't exist
    db.run(`CREATE TABLE IF NOT EXISTS sales (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product TEXT,
            amount REAL,
            date TEXT
        )`);
    db.run(`CREATE TABLE IF NOT EXISTS jama (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            amount REAL,
            date TEXT
        )`);
    db.run(`CREATE TABLE IF NOT EXISTS baki (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            amount REAL,
            party TEXT,
            date TEXT
        )`);
    db.run(`CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT,
            amount REAL,
            date TEXT
        )`);
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Add Sale
app.post("/add-sale", (req, res) => {
  const { product, amount } = req.body;
  const date = new Date().toISOString().split("T")[0];

  db.run(
    `INSERT INTO sales (product, amount, date) VALUES (?, ?, ?)`,
    [product, amount, date],
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      res.redirect("/");
    },
  );
});

// Add Jama
app.post("/add-jama", (req, res) => {
  const { amount } = req.body;
  const date = new Date().toISOString().split("T")[0];

  db.run(
    `INSERT INTO jama (amount, date) VALUES (?, ?)`,
    [amount, date],
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      res.redirect("/");
    },
  );
});

// Add Baki
app.post("/add-baki", (req, res) => {
  const { amount, party } = req.body;
  const date = new Date().toISOString().split("T")[0];

  db.run(
    `INSERT INTO baki (amount, party, date) VALUES (?, ?, ?)`,
    [amount, party, date],
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      res.redirect("/");
    },
  );
});

// Add Expense
app.post("/add-expense", (req, res) => {
  const { description, amount } = req.body;
  const date = new Date().toISOString().split("T")[0];

  db.run(
    `INSERT INTO expenses (description, amount, date) VALUES (?, ?, ?)`,
    [description, amount, date],
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      res.redirect("/");
    },
  );
});

// Get Daily Report
app.get("/daily-report", (req, res) => {
  const date = new Date().toISOString().split("T")[0];

  db.all(`SELECT * FROM sales WHERE date = ?`, [date], (err, salesRows) => {
    if (err) {
      return res.status(500).send("Error fetching sales data");
    }

    db.all(`SELECT * FROM jama WHERE date = ?`, [date], (err, jamaRows) => {
      if (err) {
        return res.status(500).send("Error fetching jama data");
      }

      db.all(`SELECT * FROM baki WHERE date = ?`, [date], (err, bakiRows) => {
        if (err) {
          return res.status(500).send("Error fetching baki data");
        }

        db.all(
          `SELECT * FROM expenses WHERE date = ?`,
          [date],
          (err, expenseRows) => {
            if (err) {
              return res.status(500).send("Error fetching expense data");
            }

            // Render an HTML response
            res.send(`
                        <h1>Daily Report for ${date}</h1>
                        <h2>Sales</h2>
                        <ul>${salesRows.map((sale) => `<li>${sale.product}: $${sale.amount}</li>`).join("")}</ul>
                        <h2>Jama</h2>
                        <ul>${jamaRows.map((jama) => `<li>$${jama.amount}</li>`).join("")}</ul>
                        <h2>Baki</h2>
                        <ul>${bakiRows.map((baki) => `<li>${baki.party}: $${baki.amount}</li>`).join("")}</ul>
                        <h2>Expenses</h2>
                        <ul>${expenseRows.map((expense) => `<li>${expense.description}: $${expense.amount}</li>`).join("")}</ul>
                    `);
          },
        );
      });
    });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
