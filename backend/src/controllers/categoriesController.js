import {
  getAllCategories,
  getCategoryById,
} from "../models/categoriesModel.js";

const listCategories = async (_req, res) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await getCategoryById(categoryId);

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { listCategories, fetchCategory };
