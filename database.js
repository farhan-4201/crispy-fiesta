const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin1234",
    database: "RestoManage"
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database.');
    }
});

const createTables = () => {
    // Create Customers table
    connection.query(
        `CREATE TABLE IF NOT EXISTS Customers (
            id INT AUTO_INCREMENT PRIMARY KEY,
            customerName VARCHAR(255),
            email VARCHAR(255),
            phone VARCHAR(50)
        );`,
        (err) => {
            if (err) {
                console.error("Error creating Customers table:", err);
            } else {
                console.log("Customers table created successfully.");
            }
        }
    );

    // Create Employees table
    connection.query(
        `CREATE TABLE IF NOT EXISTS Employees (
            id INT AUTO_INCREMENT PRIMARY KEY,
            firstName VARCHAR(255),
            lastName VARCHAR(255),
            type VARCHAR(50)
        );`,
        (err) => {
            if (err) {
                console.error("Error creating Employees table:", err);
            } else {
                console.log("Employees table created successfully.");
            }
        }
    );

    // Create Stores table
    connection.query(
        `CREATE TABLE IF NOT EXISTS Stores (
            id INT AUTO_INCREMENT PRIMARY KEY,
            storeName VARCHAR(255),
            phone VARCHAR(50),
            sector VARCHAR(100)
        );`,
        (err) => {
            if (err) {
                console.error("Error creating Stores table:", err);
            } else {
                console.log("Stores table created successfully.");
            }
        }
    );
};

// Call function to create tables
createTables();

// Export connection for use in server.js
module.exports = connection;
