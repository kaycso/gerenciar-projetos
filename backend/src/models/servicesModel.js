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

export { createService, updateService, getServiceById };
