import connectToDatabase from "../config/db.js";

const createService = async (service) => {
  const sql = connectToDatabase();
  const { project_id, title, description, cost } = service;

  const createdService = await sql`
    INSERT INTO services (title, description, cost, project_id)
    VALUES (${title}, ${description}, ${cost}, ${project_id})
    RETURNING *
  `;

  await sql`
    UPDATE projects
    SET cost = cost + ${cost}
    WHERE id = ${project_id}
  `;

  return createdService;
};

const getService = async (id) => {
  const sql = connectToDatabase();
  const service = await sql`
    SELECT * FROM services
    WHERE id = ${id}
  `;

  return service;
};

const updateService = async (id, service, projectCost) => {
  const sql = connectToDatabase();
  const { title, description, cost, project_id } = service;

  const updatedService = await sql`
    UPDATE services
    SET title = ${title}, description = ${description}, cost = ${cost}
    WHERE id = ${id}
    RETURNING *
  `;

  await sql`
    UPDATE projects
    SET cost = ${projectCost}
    WHERE id = ${project_id}
  `;

  return updatedService;
};

export { createService, updateService, getService };
