CREATE TABLE Publisher (
  id INT PRIMARY KEY AUTO_INCREMENT,
  Publisher_Name VARCHAR(255) NOT NULL
);

INSERT INTO publisher (Publisher_Name) VALUES
('Hachette Book Group'),
('Bloomsbury Publishing'),
('Oxford Press'),
('Tata McGraw Hill Education'),
('Green Tea Press'),
('Pearson Education');


CREATE TABLE Student (
  id INT PRIMARY KEY AUTO_INCREMENT,
  Student_ID INT UNIQUE NOT NULL,
  Student_Name VARCHAR(255) NOT NULL,
  Department VARCHAR(255) NOT NULL,
  Semester INT,
  Student_Phone BIGINT
);


CREATE TABLE Book (
  id INT PRIMARY KEY AUTO_INCREMENT,
  Author_Name VARCHAR(255) NOT NULL,
  Book_Title VARCHAR(255) NOT NULL,
  Publisher_Name VARCHAR(255) NOT NULL,
  No_Of_Copies INT,
  Edition INT NOT NULL
);

-- Insert data with IGNORE to handle duplicates
INSERT IGNORE INTO book (Author_Name, Book_Title, Publisher_Name, No_Of_Copies, Edition) VALUES
('John Smith', 'The Art of Programming', 'Hachette Book Group', 50, 1),
('Jane Doe', 'Mastering Data Science', 'Bloomsbury Publishing', 55, 2),
('Michael Johnson', 'History of the World', 'Oxford Press', 60, 1),
('Emily Brown', 'Introduction to Economics', 'Tata McGraw Hill Education', 65, 3),
('David Lee', 'Cooking with Green Tea', 'Green Tea Press', 70, 1),
('Sarah Parker', 'Learning Math with Pearson', 'Pearson Education', 75, 1),
('Daniel Evans', 'The Art of Programming', 'Hachette Book Group', 80, 2),
('Sophia Martinez', 'Mastering Data Structures', 'Bloomsbury Publishing', 85, 1),
('Robert Thompson', 'Modern Philosophy', 'Oxford Press', 90, 2),
('Jennifer Taylor', 'Digital Marketing Strategies', 'Tata McGraw Hill Education', 95, 1),
('William Clark', 'Health Benefits of Green Tea', 'Green Tea Press', 100, 1);


CREATE TABLE Loan (
  id INT PRIMARY KEY AUTO_INCREMENT,
  Student_Id INT,
  ID INT,
  Student_Name VARCHAR(255) NOT NULL,
  Book_Id INT,
  Book_Title VARCHAR(255) NOT NULL,
  Issue_Date DATE,
  Return_Date DATE,
  FOREIGN KEY (Student_Id) REFERENCES Student(id),
  FOREIGN KEY (Book_Id) REFERENCES Book(id)
);


CREATE TABLE staff (
    id INT(11) NOT NULL AUTO_INCREMENT,
    Staff_Name VARCHAR(255) NOT NULL,
    Staff_Email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY Staff_Email_Index (Staff_Email)
);


-- procedure

DELIMITER //

CREATE PROCEDURE InsertIntoBorrow(
    IN p_Student_ID INT,
    IN p_Book_Title VARCHAR(255),
    IN p_Issue_Date DATE,
    IN p_Return_Date DATE
)
BEGIN
    DECLARE v_Student_Id INT;
    DECLARE v_Book_Id INT;

    -- Get the Student Id based on the provided Student_ID
    SELECT id INTO v_Student_Id FROM Student WHERE Student_ID = p_Student_ID;

    -- Get the Book Id based on the provided Book_Title
    SELECT id INTO v_Book_Id FROM book WHERE Book_Title = p_Book_Title;

    -- Insert into the borrow table
    INSERT INTO borrow (Student_Id, actual_Id, Student_Name, Book_Id, Book_Title, Issue_Date, Return_Date)
    VALUES (v_Student_Id, p_Student_ID, (SELECT Student_Name FROM Student WHERE Student_ID = p_Student_ID), v_Book_Id, p_Book_Title, p_Issue_Date, p_Return_Date);
END //

DELIMITER ;


--Trigger

DELIMITER //

CREATE TRIGGER ReduceBookCopiesTrigger
AFTER INSERT ON borrow
FOR EACH ROW
BEGIN
    -- Update the No_Of_Copies in the book table
    UPDATE book
    SET No_Of_Copies = No_Of_Copies - 1
    WHERE Book_Title = NEW.Book_Title;
END//

DELIMITER ;

