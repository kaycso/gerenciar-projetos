import sql from "../config/db.js";

const getAllCategories = async () => {
  const categories = await sql`SELECT * FROM categories`;

  return categories;
};

export { getAllCategories };
