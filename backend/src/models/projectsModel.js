import connectToDatabase from "../config/db.js";

const getAll = async () => {
  const sql = connectToDatabase();
  const projects = await sql`SELECT * FROM projects`;

  return projects;
};

const createProject = async (createProject) => {
  const sql = connectToDatabase();
  const { title, budget, category_id } = createProject;

  const createdProject = await sql`
    INSERT INTO projects(title, budget, category_id) VALUES (${title}, ${budget}, ${category_id})
  `;

  return createdProject;
};

export { getAll, createProject };
