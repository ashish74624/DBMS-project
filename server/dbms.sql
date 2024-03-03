-- Create Publisher Table

CREATE TABLE Publisher (
  Pub_id INT PRIMARY  ,
  Publisher_Name VARCHAR(255) NOT NULL
);

-- Inserting Initial Values in Publisher
INSERT INTO publisher (pub_id, Publisher_Name) VALUES
(1, 'Hachette Book Group'),
(2, 'Bloomsbury Publishing'),
(3, 'Oxford Press'),
(4, 'Tata McGraw Hill Education'),
(5, 'Green Tea Press'),
(6, 'Pearson Education');


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
INSERT INTO book (Book_id, Author_Name, Book_Title, Publisher_Name, No_Of_Copies, Edition) VALUES
(1, 'John Smith', 'The Art of Programming', 'Hachette Book Group', 50, 1),
(2, 'Jane Doe', 'Mastering Data Science', 'Bloomsbury Publishing', 55, 2),
(3, 'Michael Johnson', 'History of the World', 'Oxford Press', 60, 1),
(4, 'Emily Brown', 'Introduction to Economics', 'Tata McGraw Hill Education', 65, 3),
(5, 'David Lee', 'Cooking with Green Tea', 'Green Tea Press', 70, 1),
(6, 'Sarah Parker', 'Learning Math with Pearson', 'Pearson Education', 75, 1),
(7, 'Sophia Martinez', 'Mastering Data Structures', 'Bloomsbury Publishing', 85, 1),
(8, 'Robert Thompson', 'Modern Philosophy', 'Oxford Press', 90, 2),
(9, 'Jennifer Taylor', 'Digital Marketing Strategies', 'Tata McGraw Hill Education', 95, 1),
(10, 'William Clark', 'Health Benefits of Green Tea', 'Green Tea Press', 100, 1);


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
INSERT INTO Student (Student_ID, Student_Name, Department, Semester, Student_Phone) VALUES
(101, 'Ashish', 'ISE', 5, 9887567890),
(102, 'Aditya', 'CSE', 4, 9876543210),
(103, 'Ansh', 'AIML', 2, 9998887776);


-- Create Staff Table

CREATE TABLE Staff (
    Staff_id INT AUTO_INCREMENT PRIMARY KEY,
    Staff_Name VARCHAR(255) NOT NULL,
    Staff_Email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);