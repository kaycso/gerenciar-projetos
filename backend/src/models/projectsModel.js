import { parse } from "dotenv";
import sql from "../config/db.js";

const getAllProjects = async () => {
  const result = await sql`
    SELECT p.*, c.name as category_name FROM projects p
    INNER JOIN categories c ON c.id = p.category_id
    ORDER BY id
  `;

  const projects = [];

  result.forEach((row) => {
    if (row.id) {
      projects.push({
        id: Number(row.id),
        title: row.title,
        budget: parseFloat(row.budget),
        cost: parseFloat(row.cost),
        category_id: Number(row.category_id),
        category_name: row.category_name
      });
    }
  });

  return projects;
};

const createProject = async (projectData) => {
  const { title, budget, category_id } = projectData;

  const [createdProject] = await sql`
    INSERT INTO projects(title, budget, category_id, cost)
    VALUES (${title}, ${budget}, ${category_id}, 0)
    RETURNING *
  `;

  return createdProject;
};

const getProjectById = async (id) => {
  const result = await sql`
    SELECT 
      p.*,
      c.name as category_name,
      s.id as service_id, s.title as service_title, s.description as service_description, s.cost as service_cost
    FROM projects p
    LEFT JOIN categories c ON c.id = p.category_id
    LEFT JOIN services s ON s.project_id = p.id
    WHERE p.id = ${id}
  `;

  const project = {
    id: result[0].id,
    title: result[0].title,
    budget: parseFloat(result[0].budget),
    cost: parseFloat(result[0].cost),
    category_id: result[0].category_id,
    category_name: result[0].category_name,
    services: [],
  };

  result.forEach((row) => {
    if (row.service_id !== null) {
      const service = {
        id: row.service_id,
        title: row.service_title,
        description: row.service_description,
        cost: parseFloat(row.service_cost),
      };

      project.services.push(service);
    }

    return;
  });

  return project;
};

const updateProject = async (id, project) => {
  const { title, budget, category_id } = project;
  const updatedProject = await sql`
    UPDATE projects
    SET title = ${title}, budget = ${budget}, category_id = ${category_id}
    WHERE id = ${id}
    RETURNING *
  `;

  return updatedProject;
};

const deleteProjectById = async (id) => {
  const [_, deletedProject] = await sql.transaction([
    sql`
      DELETE FROM services
      WHERE project_id = ${id}
    `,
    sql`
      DELETE FROM projects
      WHERE id = ${id}
      RETURNING *
    `,
  ]);

  return deletedProject;
};

export {
  getAllProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProjectById,
};
