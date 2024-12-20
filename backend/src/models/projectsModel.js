import sql from "../config/db.js";
import { queryDeleteServicesByProjectId } from "./servicesModel.js";

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
        category_name: row.category_name,
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

    return project;
  });

  return project;
};

const updateProject = async (id, project) => {
  const { title, budget, category_id } = project;
  const [result] = await sql`
    UPDATE projects
    SET title = ${title}, budget = ${budget}, category_id = ${category_id}
    WHERE id = ${id}
    RETURNING *
  `;

  const updatedProject = {
    id: result.id,
    title: result.title,
    budget: Number(result.budget),
    cost: Number(result.cost),
    category_id: result.category_id,
  };

  return updatedProject;
};

const deleteProjectById = async (id) => {
  const { query: queryString, value } = await queryDeleteServicesByProjectId(
    id
  );

  const [_, deletedProject] = await sql.transaction([
    sql(queryString, value),
    sql`
      DELETE FROM projects
      WHERE id = ${id}
      RETURNING *
    `,
  ]);

  return deletedProject;
};

const validateProjectBudget = async (projectId, newCost) => {
  const [{ budget: projectBudget }] = await sql`
    SELECT * FROM projects
    WHERE id = ${projectId}
  `;

  if (newCost > projectBudget) {
    return false;
  }

  return true;
};

const queryUpdateProjectCost = (projectId, newCost) => {
  const query = "UPDATE projects SET cost = $1 WHERE id = $2";
  const values = [newCost, projectId];

  return { query, values };
};

export {
  getAllProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProjectById,
  validateProjectBudget,
  queryUpdateProjectCost,
};
