import sql from "../config/db.js";
import { queryUpdateProjectCost } from "./projectsModel.js";

const createService = async (service, newProjectCost) => {
  const { project_id, title, description, cost } = service;
  const { query: queryString, values } = queryUpdateProjectCost(
    project_id,
    newProjectCost
  );

  const [[createdService], _] = await sql.transaction([
    sql`
      INSERT INTO services (title, description, cost, project_id)
      VALUES (${title}, ${description}, ${cost}, ${project_id})
      RETURNING *
    `,
    sql(queryString, values),
  ]);

  return createdService;
};

const getServiceById = async (id) => {
  const [result] = await sql`
    SELECT * FROM services
    WHERE id = ${id}
  `;

  const service = {
    id: result.id,
    title: result.title,
    project_id: result.project_id,
    description: result.description,
    cost: Number(result.cost),
  };

  return service;
};

const updateService = async (id, service, newProjectCost) => {
  const { title, description, cost, project_id } = service;
  const { query: queryString, values } = queryUpdateProjectCost(
    project_id,
    newProjectCost
  );

  const [updatedService, _] = await sql.transaction([
    sql`
      UPDATE services
      SET title = ${title}, description = ${description}, cost = ${cost}
      WHERE id = ${id}
      RETURNING *
    `,
    sql(queryString, values),
  ]);

  return updatedService;
};

const deleteServiceById = async (serviceData, updatedProjectCost) => {
  const { query: queryString, values } = queryUpdateProjectCost(
    serviceData.project_id,
    updatedProjectCost
  );

  const [deletedService, _] = await sql.transaction([
    sql`
      DELETE FROM services
      WHERE id = ${serviceData.id}
    `,
    sql(queryString, values),
  ]);

  return deletedService;
};

const queryDeleteServicesByProjectId = async (projectId) => {
  const query = "DELETE FROM services WHERE project_id = $1";
  const value = [projectId];

  return { query, value };
};

export {
  createService,
  updateService,
  getServiceById,
  deleteServiceById,
  queryDeleteServicesByProjectId,
};
