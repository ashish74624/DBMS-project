import mysql from "mysql";

// Create a MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbms"
});

export const addPublisher = (req, res) => {
  const { name } = req.body;

  // Construct the SQL query
  const sql = `INSERT INTO Publisher (Publisher_Name) VALUES (?)`;

  // Execute the query
  connection.query(sql, [name], (error, results) => {
    if (error) {
      console.error('Error adding publisher:', error);
      res.status(500).json({ message: 'Publisher Not Added', error: error });
    } else {
      console.log('Publisher Added:', results);
      res.status(200).json({ message: 'Publisher Added' });
    }
  });
};


export const getPublishers = (req, res) => {
  // Construct the SQL query
  const sql = `SELECT * FROM Publisher`;

  // Execute the query
  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching publishers:', error);
      res.status(500).json({ message: 'Publishers Not Found', error: error });
    } else {
      console.log('Publishers Fetched:', results);
      res.status(200).json({ publisher: results, message: 'Publishers Fetched' });
    }
  });
};


export default { addPublisher,getPublishers };