import mysql from "mysql";
import bcrypt from "bcrypt";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbms"
});

export const register = async (req, res) => {
  const { Staff_Name, Staff_Email, password } = req.body;
  console.log(Staff_Email)
  try {
    // Check if the email already exists
    const emailCheckQuery = `SELECT * FROM Staff WHERE Staff_Email = ?`;
    connection.query(emailCheckQuery, [Staff_Email], async (error, results) => {
      if (error) {
        return res.status(400).json({ done: false, error: error });
      }

      if (results.length > 0) {
        return res.status(400).json({ done: false, msg: "Email already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new staff member into the database
      const insertQuery = `INSERT INTO Staff (Staff_Name, Staff_Email, password) VALUES (?, ?, ?)`;
      connection.query(insertQuery, [Staff_Name, Staff_Email, hashedPassword], (error) => {
        if (error) {
          return res.status(400).json({ done: false, msg: error });
        }
        return res.status(200).json({ done: true });
      });
    });
  } catch (error) {
    return res.status(400).json({ done: false, msg: error });
  }
};

export const login = async (req, res) => {
  const { Staff_Email, password } = req.body;

  try {
    // Check if the staff member exists
    const userQuery = `SELECT * FROM Staff WHERE Staff_Email = ?`;
    connection.query(userQuery, [Staff_Email], async (error, results) => {
      if (error) {
        return res.json({ done: false, msg: error });
      }

      if (results.length === 0) {
        return res.json({ done: false, msg: "Staff does not exist" });
      }

      const user = results[0];

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const userWithoutPassword = {
          Staff_Name: user.Staff_Name,
          Staff_Email: user.Staff_Email
        };
        return res.json({ done: true, user: userWithoutPassword });
      } else {
        return res.json({ done: false, msg: "Invalid Password" });
      }
    });
  } catch (error) {
    return res.json({ done: false, msg: error });
  }
};

export default { register, login };
