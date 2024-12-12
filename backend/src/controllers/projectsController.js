import {
  getAllProjects,
  createProject,
  getProjectById,
  updateProject,
} from "../models/projectsModel.js";

const listProjects = async (_req, res) => {
  try {
    const projects = await getAllProjects();

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addProject = async (req, res) => {
  try {
    const project = req.body;
    const createdProject = await createProject(project);

    res.status(201).json(createdProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchProject = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await getProjectById(id);

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const modifyProject = async (req, res) => {
  const id = req.params.id;
  const project = req.body;

  try {
    const updatedProject = await updateProject(id, project);

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { listProjects, addProject, fetchProject, modifyProject };
