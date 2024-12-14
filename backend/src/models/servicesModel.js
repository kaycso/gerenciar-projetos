import sql from "../config/db.js";

const createService = async (service) => {
  const { project_id, title, description, cost } = service;

  const [createdService, _] = await sql.transaction([
    sql`
      INSERT INTO services (title, description, cost, project_id)
      VALUES (${title}, ${description}, ${cost}, ${project_id})
      RETURNING *
    `,
    sql`
      UPDATE projects
      SET cost = cost + ${cost}
      WHERE id = ${project_id}
    `,
  ]);

  return createdService;
};

const getServiceById = async (id) => {
  const service = await sql`
    SELECT * FROM services
    WHERE id = ${id}
  `;

  return service;
};

const updateService = async (id, service, projectCost) => {
  const { title, description, cost, project_id } = service;

  const [updatedService, _] = await sql.transaction([
    sql`
      UPDATE services
      SET title = ${title}, description = ${description}, cost = ${cost}
      WHERE id = ${id}
      RETURNING *
    `,
    sql`
      UPDATE projects
      SET cost = ${projectCost}
      WHERE id = ${project_id}
    `,
  ]);

  console.log(updatedService);

  return updatedService;
};

const deleteServiceById = async (id) => {
  const [{ project_id, cost: projectCost }] = await sql`
    SELECT project_id, cost FROM services
    WHERE id = ${id}
  `;

  const numericProjectCost = parseFloat(projectCost);

  const [deletedService, _] = await sql.transaction([
    sql`
      DELETE FROM services
      WHERE id = ${id}
    `,
    sql`
      UPDATE projects
      SET cost = cost - ${numericProjectCost}
      WHERE id = ${project_id}
    `,
  ]);

  return deletedService;
};

export { createService, updateService, getServiceById, deleteServiceById };
