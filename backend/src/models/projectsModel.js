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

const getProject = async (id) => {
  const sql = connectToDatabase();
  const project = await sql`
    SELECT p.* FROM projects p
    LEFT JOIN services s ON s.project_id = p.id
    LEFT JOIN categories c ON c.id = p.category_id
    WHERE p.id = ${id}
  `;

  return project;
};

export { getAll, createProject, getProject };
