import { apiFetch } from "../api";
import { endpoints } from "../endpoints";

export const getProjects = async () => {
  return await apiFetch(endpoints.projects);
};

export const getProjectById = async (id) => {
  return await apiFetch(`${endpoints.projects}/${id}`);
};

export const createProject = async (projectData) => {
  return await apiFetch(endpoints.projects, {
    method: "POST",
    body: JSON.stringify(projectData),
  });
};

export const modifyProject = async (id, projectData) => {
    return await apiFetch(`${endpoints.projects}/${id}`, {
        method: "PUT",
        body: JSON.stringify(projectData)
    })
}

export const deleteProjectById = async (id) => {
  return await apiFetch(`${endpoints.projects}/${id}`, {
    method: "DELETE",
  });
};
