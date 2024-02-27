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

export const addStudent = (req, res) => {
  const { Student_ID, Student_Name, Department, Semester, Student_Phone } = req.body;

  // Construct the SQL query
  const sql = `INSERT INTO Student (Student_ID, Student_Name, Department, Semester, Student_Phone) VALUES (?, ?, ?, ?, ?)`;

  // Execute the query using the pool
  pool.query(sql, [Student_ID, Student_Name, Department, Semester, Student_Phone], (error, results) => {
    if (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        console.error('Error adding student:', error);
        res.status(403).json({ message: 'Student_ID already exists.' });
      } else {
        console.error('Error adding student:', error);
        res.status(403).json({ message: 'Student Not Added' });
      }
    } else {
      console.log('Student Added:', results);
      res.status(200).json({ message: 'Student Added', student: results });
    }
  });
};

export const getAllStudents = (req, res) => {
  // Construct the SQL query
  const sql = `SELECT * FROM student`;

  // Execute the query using the pool
  pool.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching students:', error);
      res.status(400).json({ message: "Unable to retrieve Student", error: error });
    } else {
      console.log('Students Retrieved:', results);
      res.status(200).json({ student: results, message: 'Student Retrieved' });
    }
  });
};

export default { addStudent, getAllStudents };
