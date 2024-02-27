import Book from'../models/Book.js'
import mysql from "mysql";

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbms",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const addBook = async (req, res) => {
  const { Author_Name, Title, Publisher_Name, Copies, Edition } = req.body;

  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Execute the SQL query to insert a new book
    const [rows] = await connection.execute(
      `INSERT INTO Book (Author_Name, Book_Title, Publisher_Name, No_Of_Copies, Edition) VALUES (?, ?, ?, ?, ?)`,
      [Author_Name, Title, Publisher_Name, Copies, Edition]
    );

    // Release the connection back to the pool
    connection.release();

    res.status(200).json({ message: 'Book Added' });
  } catch (err) {
    console.error('Error adding book:', err);
    res.status(500).json({ message: 'Book Not Added', error: err });
  }
};

export const getAllBooks = (req, res) => {
  // Construct the SQL query
  const sql = `SELECT * FROM Book`;

  // Execute the query
  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ message: 'Books Not Found', error: error });
    } else {
      console.log('Books Fetched:', results);
      res.status(200).json({ books: results });
    }
  });
};

export default {addBook,getAllBooks};