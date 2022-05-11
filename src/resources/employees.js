const fs = require('fs');
const employees = require('../data/employees.json');

export const createEmployee = (req, res) => {
  const newEmployee = {
    dni: req.body.dni,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
  };

  if (!newEmployee.first_name
    || !newEmployee.last_name
    || !newEmployee.dni
    || !newEmployee.email
    || !newEmployee.password) {
    return res.status(400).json({
      success: false,
      msg: 'Please include a name, last name, dni, email and password',
    });
  }
  employees.push(newEmployee);
  fs.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
    if (err) {
      res.status(400).json({
        success: false,
        msg: (err),
      });
    }
  });
  return res.status(200).json({
    success: true,
    msg: 'Employee created',
    data: newEmployee,
  });
};

export const updateEmployee = (req, res) => {
  const employeeFound = employees.some((employee) => employee.dni === parseInt(req.query.dni, 10));
  const updEmployee = req.body;
  if (employeeFound) {
    employees.forEach((employee, index) => {
      if (employee.dni === parseInt(req.query.dni, 10)) {
        employees[index].first_name = updEmployee.first_name;
        employees[index].last_name = updEmployee.last_name;
        employees[index].email = updEmployee.email;
        employees[index].password = updEmployee.password;
        fs.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
          if (err) {
            res.status(400).json({
              success: false,
              msg: (err),
            });
          }
        });
      }
    });
  } else {
    res.status(400).json({
      success: false,
      msg: `No member with the dni of ${req.query.dni}`,
    });
  }
  res.status(200).json({
    success: true,
    msg: (`Employee dni ${updEmployee.dni} edited`),
    data: updEmployee,
  });
};

export const deleteEmployee = (req, res) => {
  const employeeDni = parseInt(req.query.dni, 10);
  const found = employees.filter((employee) => employee.dni !== employeeDni);
  if (employees.length === found.length) {
    res.status(400).json({
      success: false,
      msg: 'Employee DNI not found',
    });
  } else {
    fs.writeFile('src/data/employees.json', JSON.stringify(found), (err) => {
      if (err) {
        res.status(400).json({
          success: false,
          msg: (err),
        });
      }
    });
    res.status(200).json({
      success: true,
      msg: (`Employee dni: ${employeeDni} deleted.`),
    });
  }
};
