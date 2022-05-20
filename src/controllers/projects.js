import Projects from '../models/Projects';

export const getAllProjects = async (req, res) => {
  try {
    const findAll = await Projects.find({}).populate('Employees', {
      firstName: 1,
      lastName: 1,
    }, 'Admins', {
      firstName: 1,
      lastName: 1,
    });
    return res.status(200).json({
      msg: 'All the projects found',
      data: findAll,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      msg: err,
      error: true,
    });
  }
};

export const deleteById = async (req, res) => {
  try {
    const deleted = await Projects.findByIdAndDelete(req.params.id).populate('Employees', {
      firstName: 1,
      lastName: 1,
    }, 'Admins', {
      firstName: 1,
      lastName: 1,
    });
    if (!deleted) {
      return res.status(404).json({
        msg: 'Project not found.',
        data: undefined,
        error: true,
      });
    } return res.status(200).json({
      msg: 'Project deleted.',
      data: deleted,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      msg: 'there was an error',
      data: undefined,
      error: true,
    });
  }
};

export const createProject = async (req, res) => {
  try {
    const newProjects = new Projects({
      ...req.body,
    });
    await newProjects.save();
    return res.status(201).json({
      msg: 'New Project successfully created',
      data: newProjects,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'There was an error',
      data: error,
      error: false,
    });
  }
};

export const updateProjectById = async (req, res) => {
  try {
    const projectToUpdate = await Projects.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    ).populate('Employees', {
      firstName: 1,
      lastName: 1,
    }, 'Admins', {
      firstName: 1,
      lastName: 1,
    });

    if (!projectToUpdate) {
      return res.status(400).json({
        msg: `Project not found for id: ${req.params.id}`,
        error: true,
      });
    }
    return res.status(200).json({
      msg: `Project with id ${req.params.id} has been successfully updated!`,
      data: projectToUpdate,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'There was an error',
      data: error,
      error: true,
    });
  }
};

export const getProjectsByStatus = async (req, res) => {
  try {
    const activeProjects = await Projects.find({ isActive: req.params.status }).populate('Employees', {
      firstName: 1,
      lastName: 1,
    }, 'Admins', {
      firstName: 1,
      lastName: 1,
    });
    if (activeProjects.length) {
      return res.status(200).json({
        msg: 'Obtained projects!',
        data: activeProjects,
        error: false,
      });
    }
    return res.status(400).json({
      msg: `Projects not found for status: ${req.params.status}`,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'There was an error',
      data: error,
      error: true,
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const wantedProject = await Projects.findById(req.params.id).populate('Employees', {
      firstName: 1,
      lastName: 1,
    }, 'Admins', {
      firstName: 1,
      lastName: 1,
    });

    if (wantedProject) {
      return res.status(200).json({
        msg: 'Successful search!',
        data: wantedProject,
        error: false,
      });
    }
    return res.status(400).json({
      msg: `Project not found for id: ${req.params.id}`,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'There was an error',
      data: error,
      error: true,
    });
  }
};
