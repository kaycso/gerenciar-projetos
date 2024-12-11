import express from "express";
import {
  createProject,
  getAll as getAllProjects,
  getProject,
} from "./controllers/projectsController.js";
import { getAll as getAllCategories } from "./controllers/categoriesController.js";

const router = express.Router();

router.get("/projects", getAllProjects);

router.post("/projects", createProject);

router.get("/projects/:id", getProject);

router.get("/categories", getAllCategories);

export default router;
