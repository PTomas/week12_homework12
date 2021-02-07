DROP DATABASE employeeDatabase;

CREATE DATABASE employeeDatabase;

USE employeeDatabase;

CREATE TABLE employees (
	ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    firstName varchar(255),
	lastName varchar(255),
    Title varchar(255),
    Department varchar(255)
);

INSERT INTO employees
    (firstName, lastName, Title, Department)
VALUES
    ('John', 'Doe', "Lead Software Engineer", "Engineering"),
    ('Mike', 'Chan', "Lead Engineer", "Engineering"),
    ('Joe', 'Ming', "Accountant", "Finance"),
	('Bill', 'Williams', "Manager", "Manager"),
    ('Tom', 'Stevenson', "Lawyer", "Legal")

