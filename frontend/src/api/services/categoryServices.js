import { apiFetch } from "../api";
import { endpoints } from "../endpoints";

export const getCategories = async () => {
  return await apiFetch(endpoints.categories);
};

export const getCategoryBydId = async (id) => {
  return await apiFetch(`${endpoints.categories}/${id}`);
};
