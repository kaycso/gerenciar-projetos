import { validateProjectBudget } from "../models/projectsModel.js";
import {
  createService,
  deleteServiceById,
  getServiceById,
  updateService,
} from "../models/servicesModel.js";
import { calculateNewProjectCost } from "../services/projectsService.js";

const addService = async (req, res) => {
  const serviceData = req.body;

  try {
    const newProjectCost = await calculateNewProjectCost(
      serviceData.project_id,
      serviceData.cost
    );

    const isValidCost = await validateProjectBudget(
      serviceData.project_id,
      newProjectCost
    );
    if (!isValidCost) {
      return res
        .status(400)
        .json({ message: "Gastos totais não podem ultrapassar o orçamento!" });
    }

    const createdService = await createService(serviceData, newProjectCost);

    res.status(201).json(createdService);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const modifyService = async (req, res) => {
  const serviceId = req.params.id;
  const service = req.body;

  try {
    const newProjectCost = await calculateNewProjectCost(
      service.project_id,
      service.cost,
      serviceId
    );

    const isValidCost = await validateProjectBudget(
      service.project_id,
      newProjectCost
    );
    if (!isValidCost) {
      return res.status(400).json({
        message: "Novo gasto total execede o orçamento do projeto!",
      });
    }

    const [updatedService] = await updateService(
      serviceId,
      service,
      newProjectCost
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
    const serviceData = await getServiceById(serviceId);
    const newProjectCost = await calculateNewProjectCost(
      serviceData.project_id,
      0,
      serviceId
    );
    const deletedService = await deleteServiceById(serviceData, newProjectCost);

    res.status(200).json(deletedService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { addService, modifyService, removeService };
