import {
  getProjectById,
} from "../models/projectsModel.js";
import { getServiceById } from "../models/servicesModel.js";

const calculateNewProjectCost = async (
  projectId,
  newServiceCost,
  serviceId = null
) => {
  const project = await getProjectById(projectId);

  const isNewService = serviceId ? false : true;
  if (!isNewService) {
    const { cost: previousServiceCost } = await getServiceById(serviceId);

    const costDifference = newServiceCost - previousServiceCost;
    const newProjectCost = project.cost + costDifference;
    return newProjectCost;
  }

  const newProjectCost = project.cost + newServiceCost;

  return newProjectCost;
};

export { calculateNewProjectCost };
