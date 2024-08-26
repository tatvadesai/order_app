const express = require('express');
const path = require('path');
const db = require('./database');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Define your routes here (e.g., to handle form submissions)

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
