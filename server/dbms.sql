-- Create Publisher Table

CREATE TABLE Publisher (
  Pub_id INT PRIMARY KEY AUTO_INCREMENT ,
  Publisher_Name VARCHAR(255) NOT NULL
);

-- Inserting Initial Values in Publisher



-- Create Book Table

CREATE TABLE Book (
  Book_id INT PRIMARY KEY ,
  Author_Name VARCHAR(255) NOT NULL,
  Book_Title VARCHAR(255) NOT NULL,
  Publisher_Name VARCHAR(255) NOT NULL,
  No_Of_Copies INT,
  Edition INT NOT NULL
);

-- Inserting Initial Values in Book




-- Create Borrow Table

CREATE TABLE Borrow (
  id INT PRIMARY KEY ,
  Student_Id INT,
  Student_Name VARCHAR(255) NOT NULL,
  Book_Id INT,
  Book_Title VARCHAR(255) NOT NULL,
  Issue_Date DATE,
  Return_Date DATE,
  FOREIGN KEY (Student_Id) REFERENCES Student(id),
  FOREIGN KEY (Book_Id) REFERENCES Book(id)
);


-- Create Student Table

CREATE TABLE Student (
  Student_ID INT PRIMARY KEY NOT NULL,
  Student_Name VARCHAR(255) NOT NULL,
  Department VARCHAR(255) NOT NULL,
  Semester INT,
  Student_Phone BIGINT
);

-- Inserting Inital Values


-- Create Staff Table

CREATE TABLE Staff (
    Staff_id INT AUTO_INCREMENT PRIMARY KEY,
    Staff_Name VARCHAR(255) NOT NULL,
    Staff_Email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Insert Initial Values
