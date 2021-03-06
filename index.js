const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);


var mysql = require("mysql");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employeeDatabase"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  generateQuestions();
});

var employees
var namesArray

function generateQuestions() {
  connection.query("SELECT * FROM employees", function(err, res) {
    if (err) throw err;
    console.table(res);
    employees = res;
    
    promptUser();
    
  });
}

var queries = {
  users: "SELECT firstName FROM employees"
};

// const getList = (employees) => {

//   namesArray.push(employees[].firstName)
// };

function promptUser() {
  return inquirer.prompt([
    {
      type: "list",
      name: "WhatToDo",
      message: "What would you like to do?",
      choices:[
        {key:'a',
         value:'Add Employee'},
        {key:'b',
         value:'Delete Employee'},
        {key:'c',
         value:'View Departments'}
      ],
    }
  ])
  .then(answers =>{
    if(answers.WhatToDo === "Add Employee"){
      console.info(answers.WhatToDo)
      addEmployee();
    }
    if(answers.WhatToDo === "Delete Employee"){
      console.info(answers.WhatToDo)
      deleteEmployee();
    }
    if(answers.WhatToDo === "View Departments"){
      console.info(answers.WhatToDo)
      viewDepartments();
    }
  })
}

function addEmployee(){
  return inquirer.prompt([
    {
      type: "input",
      name: "First",
      message: "What is the first name of the employee?",

    },
    {
      type: "input",
      name: "Last",
      message: "What is the last name of the employee?",

    },
    {
      type: "input",
      name: "Title",
      message: "What is the employees title?",

    },
    {
      type: "input",
      name: "Department",
      message: "What department is the employee in?",

    },
    
  ])
  .then(answers =>{
    connection.query(
      'INSERT INTO employees SET ?',
      {
        firstName: answers.First,
        LastName: answers.Last,
        Title: answers.Title,
        Department: answers.Department
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + ' product inserted!\n');
        // Call updateProduct() AFTER the INSERT completes
        //updateDatabase();
      }
    );
    
  })
}
var employeeNames= [];

function deleteEmployee(){
  // connection.query("SELECT firstName FROM employees", function(err, res) {
  //   if (err) throw err;
  //   employeeNames = res;
  //   //Name[0].push(employeeNames[i].firstName)
  //   console.log(employeeNames)

  // })

  console.log(employees[0].firstName)

  //getList();
  return inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "What is the employees index?",

    },
    {
      type: "input",
      name: "First",
      message: "What is the first name of the employee?",

    },
    {
      type: "input",
      name: "Last",
      message: "What is the last name of the employee?",

    },
    {
      type: "input",
      name: "Title",
      message: "What is the employees title?",

    },
    {
      type: "input",
      name: "Department",
      message: "What department is the employee in?",

    },
  ])
  .then(answers =>{
    connection.query(
      'DELETE FROM employees WHERE ?',
      {
        id: answers.id
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + ' product inserted!\n');
        // Call updateProduct() AFTER the INSERT completes
        //updateDatabase();
      }
    );
    
  })

}

function viewDepartments(){
  connection.query("SELECT Department FROM  employees", function(err, res) {
    if (err) throw err;
    console.log(res);
    promptUser();
    connection.end();
    
  });
}
// function updateDatabase(){
//   connection.query("UPDATE * WHERE employees")
// }