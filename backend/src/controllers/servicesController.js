import { getProjectById } from "../models/projectsModel.js";
import {
  createService,
  deleteServiceById,
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
    const { cost: projectCost, budget: projectBudget } = await getProjectById(
      service.project_id
    );

    const costDifference =
      parseFloat(service.cost) - parseFloat(previousServiceCost);
    const updatedProjectCost = parseFloat(projectCost) + costDifference;

    if (updatedProjectCost > projectBudget) {
      return res.status(400).json({
        message: "Gasto total não pode ser maior que o orçamento do projeto!",
      });
    }

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

const removeService = async (req, res) => {
  const serviceId = req.params.id;

  try {
    const deletedService = await deleteServiceById(serviceId);
    res.status(200).json(deletedService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { addService, modifyService, removeService };
