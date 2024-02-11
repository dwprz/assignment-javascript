import express from "express";
import cors from "cors";
import { router } from "../routes/api.js";

export const app = new express();

app.use(cors());
app.use(express.static("../../public"));
app.use(express.json());
app.use(router);
