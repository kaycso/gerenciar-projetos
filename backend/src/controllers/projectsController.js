import e from "express";
import {
  getAllProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProjectById,
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
  const projectData = req.body;

  const previousProject = await getProjectById(id);
  if (parseFloat(projectData.budget) < previousProject.cost) {
    return res.status(400).json({
      message: "O orçamento não pode ser maior que os gastos cadastrados",
    });
  }

  try {
    const updatedProject = await updateProject(id, projectData);

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeProject = async (req, res) => {
  const projectId = req.params.id;

  try {
    const deletedProject = await deleteProjectById(projectId);

    res.status(200).json(deletedProject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export { listProjects, addProject, fetchProject, modifyProject, removeProject };
