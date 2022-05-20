import TasksModel from '../models/Tasks';

export const getTasks = async (req, res) => {
  try {
    const tasks = await TasksModel.find({}).populate('Employees', {
      firstName: 1,
      lastName: 1,
    }, 'Projects', {
      projectName: 1,
      description: 1,
    });
    return res.status(200).json({
      message: 'Request Successful. All tasks.',
      data: tasks,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export const findTask = async (req, res) => {
  try {
    const taskById = await TasksModel.findById(req.params.id).populate('Employees', {
      firstName: 1,
      lastName: 1,
    }, 'Projects', {
      projectName: 1,
      description: 1,
    });
    if (taskById) {
      return res.status(200).json({
        message: (`Request Successful. Task with Id: ${req.params.id} found.`),
        data: taskById,
        error: false,
      });
    }
    return res.status(404).json({
      message: (`Id: ${req.params.id} doesn't exist.`),
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: (`An error has ocurred: ${error}`),
      data: undefined,
      error: true,
    });
  }
};

export const addTask = async (req, res) => {
  try {
    const taskNew = new TasksModel({
      employeeId: req.body.employeeId,
      projectId: req.body.projectId,
      title: req.body.title,
      description: req.body.description,
      date: Date.now(),
      done: req.body.done,
    });
    const saveTask = await taskNew.save();
    return res.status(201).json({
      message: 'Task Added',
      data: saveTask,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Please include employee ID, project ID, title, description, date and done.',
      data: undefined,
      error: true,
    });
  }
};

export const editTask = async (req, res) => {
  const { id } = req.params;
  try {
    const modifiedTask = await TasksModel.findByIdAndUpdate(id, req.body, { new: true }).populate('Employees', {
      firstName: 1,
      lastName: 1,
    }, 'Projects', {
      projectName: 1,
      description: 1,
    });
    if (modifiedTask) {
      return res.status(200).json({
        message: 'Task Modified',
        data: modifiedTask,
        error: false,
      });
    }
    return res.status(400).json({
      message: (`Id: ${id} doesn't exist.`),
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: (`Error: ${error}`),
      data: undefined,
      error: true,
    });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTaskById = await TasksModel.findByIdAndDelete(id).populate('Employees', {
      firstName: 1,
      lastName: 1,
    }, 'Projects', {
      projectName: 1,
      description: 1,
    });
    if (deleteTaskById) {
      return res.status(200).json({
        message: 'Task Deleted',
        data: deleteTaskById,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Task with id: ${id} not found`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};
