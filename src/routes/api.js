import express from "express";
import { imagesController } from "../controllers/images/controller.js";

export const router = new express.Router();

router.get("/api/photos", imagesController.getAll);
