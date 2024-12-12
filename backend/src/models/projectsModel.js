import sql from "../config/db.js";

const getAllProjects = async () => {
  const projects = await sql`SELECT * FROM projects`;

  return projects;
};

const createProject = async (projectData) => {
  const { title, budget, category_id } = projectData;

  const [createdProject] = await sql`
    INSERT INTO projects(title, budget, category_id)
    VALUES (${title}, ${budget}, ${category_id})
    RETURNING *
  `;

  return createdProject;
};

const getProjectById = async (id) => {
  const project = await sql`
    SELECT p.* FROM projects p
    LEFT JOIN services s ON s.project_id = p.id
    LEFT JOIN categories c ON c.id = p.category_id
    WHERE p.id = ${id}
  `;

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

export { getAllProjects, createProject, getProjectById, updateProject };
