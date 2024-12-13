import express from "express";
import { listCategories } from "./controllers/categoriesController.js";
import {
  addProject,
  listProjects,
  fetchProject,
  modifyProject,
  removeProject,
} from "./controllers/projectsController.js";
import { addService, modifyService } from "./controllers/servicesController.js";

const router = express.Router();

router.get("/projects", listProjects);

router.post("/projects", addProject);

router.get("/projects/:id", fetchProject);

router.put("/projects/:id", modifyProject);

router.delete("/projects/:id", removeProject);

router.get("/categories", listCategories);

router.post("/services", addService);

router.put("/services/:id", modifyService);

export default router;
