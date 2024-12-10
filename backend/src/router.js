import express from "express";
import { getAll as getAllProjects } from "./controllers/projectsController.js";
import { getAll as getAllCategories } from "./controllers/categoriesController.js";

const router = express.Router();

router.get("/projects", getAllProjects);
router.get("/categories", getAllCategories);

export default router;
