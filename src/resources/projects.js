const fs = require('fs');
const projects = require('../data/projects.json');

export const putById = (req, res) => {
  const { id } = req.params;

  const {
    name, description, status, owner, pm, client, dateStart, employees,
  } = req.body;

  const updatedProject = {
    id: parseInt(id, 10),
    name: name || '',
    description: description || '',
    status: status || '',
    owner: owner || '',
    pm: pm || '',
    client: client || '',
    dateStart: dateStart || '',
    employees: employees || '',
  };

  const projectIndex = projects.findIndex((proj) => proj.id === parseInt(id, 10));

  if (projectIndex !== -1) {
    projects[projectIndex] = updatedProject;
    fs.writeFileSync('./src/data/projects.json', JSON.stringify(projects));
    return res.status(200).json({
      success: true,
      data: updatedProject,
    });
  }
  return res.status(400).json({
    success: false,
    msg: ('Project not found'),
  });
};

export const deleteById = (req, res) => {
  const num = parseInt(req.params.id, 10);

  let index = -1;

  const ids = projects.map((project) => project.id);

  index = ids.indexOf(num);
  // res.status(200).json(index);
  if (index !== -1) {
    projects.splice(index, 1);
    fs.writeFileSync('src/data/projects.json', JSON.stringify(projects));
    return res.status(200).json({
      success: true,
      data: projects,
    });
  }
  return res.status(400).json({
    success: false,
    msg: ('Project not found'),
  });

  // let index = -1;
  // const ids = projects.map((project) => project.id);
  // index = ids.indexOf(req.params.id);

  // if (index !== -1) {
  //   projects.slice(index, 1);
  //   fs.writeFile('src/data/projects.json', JSON.stringify(projects));
  //   return res.status(200).json({
  //     success: true,
  //     data: projects,
  //   });
  // }
  // return res.status(400).json({
  //   success: false,
  //   msg: ('Project not found'),
  // });

  // const projectId = parseInt(req.params.id, 10);

  // const projectsFilter = projects.filter((proj) => proj.id !== projectId);

  // if (projects.length === projectsFilter.length) {
  //   res.send('Project not found');
  // } else {
  //   fs.writeFile('src/data/projects.json', JSON.stringify(projectsFilter), (err) => {
  //     if (err) {
  //       return res.status(400).json({
  //         success: false,
  //         msg: ('Project not found'),
  //       });
  //     }
  //     return res.status(200).json({
  //       success: true,
  //       data: projects,
  //     });
  //   });
  // }
};

export const putEmployee = (req, res) => {
  const { id } = req.params;

  const {
    name, roll, salary, hoursInProjects, rates,
  } = req.body;

  const newEmployee = {
    name: name || '',
    idEmployee: req.body.id || '',
    roll: roll || '',
    salary: salary || '',
    hoursInProjects: hoursInProjects || '',
    rates: rates || '',
  };

  const project = projects.find((proj) => proj.id === parseInt(id, 10));
  const projectIndex = projects.findIndex((proj) => proj.id === parseInt(id, 10));

  if (project) {
    project.employees.push(newEmployee);
    projects[projectIndex] = project;
    fs.writeFileSync('./src/data/projects.json', JSON.stringify(projects));
    return res.status(200).json({
      success: true,
      data: project,
    });
  }
  return res.status(400).json({
    success: false,
    msg: ('Project not found'),
  });
};

export const getByStatus = (req, res) => {
  const { status } = req.params;
  const projectsFilter = projects.filter((proj) => proj.status.toString() === status);
  if (projectsFilter) {
    return res.status(200).json({
      success: true,
      data: projectsFilter,
    });
  }
  return res.status(400).json({
    success: false,
    msg: ('Project not found'),
  });
};
