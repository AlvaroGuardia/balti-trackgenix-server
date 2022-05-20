import TimeSheetModel from '../models/Time-sheets';

export const getAllTimeSheets = async (req, res) => {
  try {
    const allTimeSheets = await TimeSheetModel.find({}).populate('Employees', {
      firstName: 1,
      lastName: 1,
    }, 'Projects', {
      projectName: 1,
      description: 1,
    }, 'Tasks', {
      employeeId: 1,
      projectId: 1,
    });
    return res.status(200).json({
      message: 'All timesheets',
      data: allTimeSheets,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

export const getTimeSheet = async (req, res) => {
  try {
    const timeSheet = await TimeSheetModel.findById(req.params.id).populate('Employees', {
      firstName: 1,
      lastName: 1,
    }, 'Projects', {
      projectName: 1,
      description: 1,
    }, 'Tasks', {
      employeeId: 1,
      projectId: 1,
    });
    if (!timeSheet) {
      return res.status(404).json({
        message: 'Timesheet not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Timesheet with the id ${req.params.id}`,
      data: timeSheet,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'There was an error',
      data: error,
      error: true,
    });
  }
};

export const deleteTimeSheets = async (req, res) => {
  try {
    const result = await TimeSheetModel.findByIdAndDelete(req.params.id).populate('Employees', {
      firstName: 1,
      lastName: 1,
    }, 'Projects', {
      projectName: 1,
      description: 1,
    }, 'Tasks', {
      employeeId: 1,
      projectId: 1,
    });
    if (!result) {
      return res.status(404).json({
        message: 'The timesheet has not been found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      msg: 'Timesheet successfully deleted',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'There was an error',
      data: error,
      error: true,
    });
  }
};

export const addTimeSheet = async (req, res) => {
  const newTimeSheet = new TimeSheetModel({
    employee: req.body.employee,
    project: req.body.project,
    role: req.body.role,
    date: Date.now(),
    rate: req.body.rate,
    workedHours: req.body.workedHours,
    description: req.body.description,
    task: req.body.task,
  });
  try {
    const savedTimeSheet = await newTimeSheet.save();
    return res.status(201).json({
      message: 'Timesheet successfully created',
      data: savedTimeSheet,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: err,
      data: undefined,
      error: true,
    });
  }
};

export const editTimeSheet = async (req, res) => {
  try {
    const result = await TimeSheetModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    ).populate('Employees', {
      firstName: 1,
      lastName: 1,
    }, 'Projects', {
      projectName: 1,
      description: 1,
    }, 'Tasks', {
      employeeId: 1,
      projectId: 1,
    });
    if (!result) {
      return res.status(404).json({
        message: 'The timesheet has not been found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Timesheet edited',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'There was an error',
      data: error,
      error: true,
    });
  }
};

export const getAllTimeSheetsByEmployee = async (req, res) => {
  try {
    const filterByEmployee = await TimeSheetModel.find({ employee: req.params.employee }).populate('Employees', {
      firstName: 1,
      lastName: 1,
    }, 'Projects', {
      projectName: 1,
      description: 1,
    }, 'Tasks', {
      employeeId: 1,
      projectId: 1,
    });
    if (filterByEmployee.length) {
      return res.status(200).json({
        message: `Timesheets with the employee ${req.params.employee}`,
        data: filterByEmployee,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'The employee has not been found',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'There was an error',
      data: error,
      error: true,
    });
  }
};
