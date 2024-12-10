import connectToDatabase from "../config/db.js";

const getAll = async () => {
  const sql = connectToDatabase();
  const projects = await sql`SELECT * FROM projects`;

  return projects;
};

export { getAll };
