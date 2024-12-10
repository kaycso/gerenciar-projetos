import connectToDatabase from "../config/db.js";

const getAll = async () => {
  const sql = connectToDatabase();
  const categories = await sql`SELECT * FROM categories`;

  return categories;
};

export { getAll };
