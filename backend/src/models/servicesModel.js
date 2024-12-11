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

export { createService };
