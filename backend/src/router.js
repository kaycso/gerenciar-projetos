import express from "express";
import {
  createProject,
  getAll as getAllProjects,
  getProject,
  updateProject,
} from "./controllers/projectsController.js";
import { getAll as getAllCategories } from "./controllers/categoriesController.js";
import { createService } from "./controllers/servicesController.js";

const router = express.Router();

router.get("/projects", getAllProjects);

router.post("/projects", createProject);

router.get("/projects/:id", getProject);

router.put("/projects/:id", updateProject);

router.get("/categories", getAllCategories);

router.post("/services", createService);

export default router;
