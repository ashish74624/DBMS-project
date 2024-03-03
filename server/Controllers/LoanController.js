import mysql from "mysql";

// Create a MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbms"
});

export const addLoan = async (req, res) => {
  const { Student_ID, Book_Title, Issue_Date, Return_Date } = req.body;

  try {
    // Get student ID from the Student table
    const studentQuery = `SELECT id, Student_Name FROM Student WHERE Student_ID = ?`;
    connection.query(studentQuery, [Student_ID], (error, studentRows) => {
      if (error) {
        console.error("Error querying student:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      if (studentRows.length === 0) {
        return res.status(404).json({ message: "Student not found" });
      }

      const student = studentRows[0];

      // Get book ID from the Book table
      const bookQuery = `SELECT id FROM Book WHERE Book_Title = ?`;
      connection.query(bookQuery, [Book_Title], (error, bookRows) => {
        if (error) {
          console.error("Error querying book:", error);
          return res.status(500).json({ message: "Internal Server Error" });
        }

        if (bookRows.length === 0) {
          return res.status(404).json({ message: "Book not found" });
        }

        const book = bookRows[0];

        // Insert loan into borrow table
        const loanQuery = `
          INSERT INTO borrow (Student_Id, actual_Id, Student_Name, Book_Id, Book_Title, Issue_Date, Return_Date)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        connection.query(loanQuery, [
          student.id,
          Student_ID,
          student.Student_Name,
          book.id,
          Book_Title,
          Issue_Date,
          Return_Date
        ], (error, result) => {
          if (error) {
            console.error("Error inserting loan:", error);
            return res.status(500).json({ message: "Internal Server Error" });
          }

          return res.status(200).json({ message: "Book Allocated" });
        });
      });
    });
  } catch (error) {
    console.error("Error allocating book:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllLoans = (req, res) => {
  // Construct the SQL query
  const sql = `SELECT * FROM borrow`;

  // Execute the query
  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching loans:', error);
      res.status(500).json({ message: "Can't get Loan data", error: error });
    } else {
      res.status(200).json({ message: 'Loans Retrieved', loans: results });
    }
  });
};

export const getStudentLoans = (req, res) => {
  // Construct the SQL query
  const sql = `
    SELECT borrow.actual_id AS Student_Id, borrow.Student_Name, borrow.Book_Title, borrow.Return_Date 
    FROM borrow 
  `;

  // Execute the query
  connection.query(sql, (error, results) => {
    if (error) {
      res.status(500).json({ done: false, error: error });
    } else {
      const studentsMap = {}; // Using an object as a HashMap
        console.log(results)
      // Process the results to create student objects with their loans
      results.forEach(loan => {
        const { Student_Id, Student_Name, Book_Title, Return_Date } = loan;
        if (studentsMap[Student_Id]) {
          studentsMap[Student_Id].books.push({ Book_Title, Return_Date });
        } else {
          studentsMap[Student_Id] = { Student_Id, Student_Name, books: [{ Book_Title, Return_Date }] };
        }
      });

      // Convert the HashMap object to an array of students
      const students = Object.values(studentsMap);

      res.status(200).json({ done: true, students });
    }
  });
};

// Close the connection when the module is unloaded
process.on('exit', () => {
  connection.end();
});

export default { addLoan, getAllLoans, getStudentLoans };
