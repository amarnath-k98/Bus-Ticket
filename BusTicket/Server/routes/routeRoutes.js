import express from "express";
import { addRoute, getRoutes } from "../controllers/routeController.js";

const router = express.Router();

router.post("/", addRoute);
router.get("/", getRoutes);

export default router;
