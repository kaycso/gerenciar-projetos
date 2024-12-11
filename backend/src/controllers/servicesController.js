import { createService as createServiceModel } from "../models/servicesModel.js";

const createService = async (req, res) => {
  try {
    const service = req.body;
    console.log(service);
    const createdService = await createServiceModel(service);

    res.status(201).json(createdService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createService };
