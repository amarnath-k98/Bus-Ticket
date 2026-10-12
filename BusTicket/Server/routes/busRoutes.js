import { Router } from "express";
import { addBus, getBuses, getBusById } from "../controllers/busController.js";


const router = Router()

router.post("/", addBus);
router.get("/", getBuses);
router.get("/:id", getBusById);

export default router;