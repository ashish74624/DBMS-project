import Loan from "../models/Loans.js";
import Student from '../models/Student.js'
import Book from "../models/Book.js";

export const addLoan = async (req, res) => {
  const { Student_ID, Book_Title, Issue_Date, Return_Date } = req.body;

  try {
    // Get student ID from the Student table
    const studentQuery = `SELECT id, Student_Name FROM Student WHERE Student_ID = ?`;
    const [studentRows] = await connection.execute(studentQuery, [Student_ID]);

    if (studentRows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    const student = studentRows[0];

    // Get book ID from the Book table
    const bookQuery = `SELECT id FROM Book WHERE Book_Title = ?`;
    const [bookRows] = await connection.execute(bookQuery, [Book_Title]);

    if (bookRows.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    const book = bookRows[0];

    // Insert loan into Loan table
    const loanQuery = `
      INSERT INTO Loan (Student_Id, ID, Student_Name, Book_Id, Book_Title, Issue_Date, Return_Date)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [loanResult] = await connection.execute(loanQuery, [
      student.id,
      Student_ID,
      student.Student_Name,
      book.id,
      Book_Title,
      Issue_Date,
      Return_Date
    ]);

    const loanId = loanResult.insertId;

    return res.status(200).json({ message: "Book Allocated", loanId: loanId });
  } catch (error) {
    console.error("Error allocating book:", error);
    return res.status(500).json({ message: "Book not Allocated", error: error });
  }
};

export const getAllLoans = async(req,res)=>{
    try {
        const loans = await Loan.find({});

        return res.status(200).json({message:"Loans Retrived",loans:loans})
    } catch (error) {
        return res.json({message:"Can't get Loan data"});
    }
}


export const getStudentLoans = async (req, res) => {
    try {
        const loans = await Loan.find({});
        const studentsMap = {}; // Using an object as a HashMap

        loans.forEach(loan => {
            const { ID, Student_Name, Book_Title, Return_Date } = loan;
            if (studentsMap[ID]) {
                studentsMap[ID].books.push({Book_Title:Book_Title,Return_Date:Return_Date});
            } else {
                studentsMap[ID] = { Student_Id: ID, Student_Name, books: [{Book_Title:Book_Title,Return_Date:Return_Date}] };
            }
        });

        // Convert the HashMap object to an array of students
        const students = Object.values(studentsMap);

        return res.status(200).json({ done: true, students });
    } catch (error) {
        return res.json({ done: false });
    }
};


export default { addLoan, getAllLoans, getStudentLoans }