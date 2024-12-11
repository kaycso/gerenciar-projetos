import {
  getAll as getAllProjects,
  createProject as createProjectModel,
  getProject as getProjectModel,
} from "../models/projectsModel.js";

const getAll = async (_req, res) => {
  try {
    const projects = await getAllProjects();

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const project = req.body;
    const createdProject = await createProjectModel(project);

    res.status(201).json(createdProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProject = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await getProjectModel(id);

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAll, createProject, getProject };
