import Employees from '../models/Employees';

export const getAllEmployees = async (req, res) => {
  try {
    const allEmployees = await Employees.find({}).populate('Projects', {
      projectName: 1,
      description: 1,
    });
    return res.status(200).json({
      message: 'All Employees collected',
      data: allEmployees,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};
export const createEmployee = async (req, res) => {
  const newEmployee = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    assignedProjects: req.body.assignedProjects,
    isActive: req.body.isActive,
  };

  try {
    const employee = new Employees(newEmployee);
    await employee.save();
    return res.status(201).json({
      message: 'New Employee created',
      data: newEmployee,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Missing data. Check the fields',
      data: error,
      error: true,
    });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const result = await Employees.findByIdAndDelete(req.params.id).populate('Projects', {
      projectName: 1,
      description: 1,
    });
    if (!result) {
      return res.status(404).json({
        message: 'Employee not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Employee id: ${req.params.id} deleted.`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};

export const getEmployeesById = async (req, res) => {
  try {
    const employee = await Employees.findById(req.params.id).populate('Projects', {
      projectName: 1,
      description: 1,
    });
    if (employee) {
      return res.status(200).json({
        message: 'Employee with the ID required collected',
        data: employee,
        error: false,
      });
    } return res.status(404).json({
      message: 'No Employee with the ID required found',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};

export const updateEmployee = async (req, res) => {
  const updatedEmployee = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    assignedProjects: req.body.assignedProjects,
    isActive: req.body.isActive,
  };

  try {
    const result = await Employees.findByIdAndUpdate(req.params.id, (updatedEmployee)).populate('Projects', {
      projectName: 1,
      description: 1,
    });
    if (!result) {
      return res.status(404).json({
        message: `Employee id: ${req.params.id} not found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Employee id: ${req.params.id} updated.`,
      data: updatedEmployee,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Bad request',
      data: error,
      error: true,
    });
  }
};
