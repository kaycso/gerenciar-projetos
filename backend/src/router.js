import express from "express";
import {
  fetchCategory,
  listCategories,
} from "./controllers/categoriesController.js";
import {
  addProject,
  listProjects,
  fetchProject,
  modifyProject,
  removeProject,
} from "./controllers/projectsController.js";
import {
  addService,
  modifyService,
  removeService,
} from "./controllers/servicesController.js";

const router = express.Router();

router.get("/projects", listProjects);

router.post("/projects", addProject);

router.get("/projects/:id", fetchProject);

router.put("/projects/:id", modifyProject);

router.delete("/projects/:id", removeProject);

router.get("/categories", listCategories);

router.get("/categories/:id", fetchCategory);

router.post("/services", addService);

router.put("/services/:id", modifyService);

router.delete("/services/:id", removeService);

export default router;
