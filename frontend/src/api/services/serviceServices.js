import { apiFetch } from "../api";
import { endpoints } from "../endpoints";

export const addService = async (serviceData) => {
  return await apiFetch(endpoints.services, {
    method: "POST",
    body: JSON.stringify(serviceData),
  });
};

export const modifyServices = async (id, serviceData) => {
  return await apiFetch(`${endpoints.services}/${id}`, {
    method: "PUT",
    body: JSON.stringify(serviceData),
  });
};

export const deleteService = async (id) => {
  return await apiFetch(`${endpoints.services}/${id}`, {
    method: "DELETE",
  });
};
