import { imagesModel } from "../../model/images/model.js";

const getAll = async (req, res, next) => {
  try {
    //
    const result = await imagesModel.getAll();
    res.status(200).json({ data: result });
    //
  } catch (error) {
    res.status(400).json({ errors: error.message || "happen error" });
  }
};

export const imagesController = {
  getAll,
};
