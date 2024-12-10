import { getAll as getAllCategories } from "../models/categoriesModel.js";

const getAll = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAll };
