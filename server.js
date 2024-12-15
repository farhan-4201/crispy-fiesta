const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
const db = require('./database');  // Corrected path to database.js
const app = express();

app.use(cors());  // Enable CORS for all routes
app.use(express.static("public"));
app.use(bodyParser.json());

// Routes for Customers
app.get('/api/customers', (req, res) => {
    db.query("SELECT * FROM Customers", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/api/customers', (req, res) => {
    const { customerName, email, phone } = req.body;
    db.query(
        "INSERT INTO Customers (customerName, email, phone) VALUES (?, ?, ?)", 
        [customerName, email, phone], 
        (err) => {
            if (err) throw err;
            res.status(201).send('Customer added');
        }
    );
});

// Routes for Employees
app.get('/api/employees', (req, res) => {
    db.query("SELECT * FROM Employees", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/api/employees', (req, res) => {
    const { firstName, lastName, type } = req.body;
    db.query(
        "INSERT INTO Employees (firstName, lastName, type) VALUES (?, ?, ?)", 
        [firstName, lastName, type], 
        (err) => {
            if (err) throw err;
            res.status(201).send('Employee added');
        }
    );
});

// Routes for Stores
app.get('/api/stores', (req, res) => {
    db.query("SELECT * FROM Stores", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/api/stores', (req, res) => {
    const { storeName, phone, sector } = req.body;
    db.query(
        "INSERT INTO Stores (storeName, phone, sector) VALUES (?, ?, ?)", 
        [storeName, phone, sector], 
        (err) => {
            if (err) throw err;
            res.status(201).send('Store added');
        }
    );
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
