import sql from "../config/db.js";

const getAllCategories = async () => {
  const categories = await sql`SELECT * FROM categories`;

  return categories;
};

const getCategoryById = async (id) => {
  const [category] = await sql`
    SELECT * FROM categories
    WHERE id = ${id}
  `;

  return category;
};

export { getAllCategories, getCategoryById };
