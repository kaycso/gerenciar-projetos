import { getProjectById } from "../models/projectsModel.js";
import {
  createService,
  getServiceById,
  updateService,
} from "../models/servicesModel.js";

const addService = async (req, res) => {
  try {
    const service = req.body;
    console.log(service);
    const createdService = await createService(service);

    res.status(201).json(createdService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const modifyService = async (req, res) => {
  const serviceId = req.params.id;
  const service = req.body;

  const getProjectCost = async (projectId) => {
    const [{ cost }] = await getProjectById(projectId);

    return Number(cost);
  };

  const getPreviousServiceCost = async (serviceId) => {
    const [{ cost }] = await getServiceById(serviceId);

    return Number(cost);
  };

  const previousServiceCost = await getPreviousServiceCost(serviceId);
  let projectCost = await getProjectCost(service.project_id);

  try {
    if (service.cost >= previousServiceCost) {
      projectCost = projectCost + (service.cost - previousServiceCost);
    }

    if (service.cost < previousServiceCost) {
      projectCost = projectCost - (previousServiceCost - service.cost);
    }

    const updatedService = await updateService(serviceId, service, projectCost);

    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { addService, modifyService };
