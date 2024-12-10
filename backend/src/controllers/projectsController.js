import { getAll as getAllProjects } from "../models/projectsModel.js";

const getAll = async (req, res) => {
  try {
    const projects = await getAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAll };
