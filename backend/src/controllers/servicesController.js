import { getProjectById } from "../models/projectsModel.js";
import {
  createService,
  getServiceById,
  updateService,
} from "../models/servicesModel.js";

const addService = async (req, res) => {
  const service = req.body;

  const project = await getProjectById(service.project_id);
  const projectCost = project.cost;
  const newProjectCost = projectCost + service.cost;

  if (newProjectCost > project.budget) {
    return res
      .status(400)
      .json({ message: "Gastos totais não podem ultrapassar o orçamento!" });
  }

  try {
    const createdService = await createService(service);

    res.status(201).json(createdService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const modifyService = async (req, res) => {
  const serviceId = req.params.id;
  const service = req.body;

  try {
    const [{ cost: previousServiceCost }] = await getServiceById(serviceId);
    const { cost: projectCost } = await getProjectById(service.project_id);

    const costDifference = Number(service.cost) - Number(previousServiceCost);
    const updatedProjectCost = Number(projectCost) + costDifference;

    const updatedService = await updateService(
      serviceId,
      service,
      updatedProjectCost
    );

    res.status(200).json(updatedService);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export { addService, modifyService };
