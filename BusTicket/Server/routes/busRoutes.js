import { Router } from "express";
import { addBus, getBuses } from "../controllers/busController.js";


const router = Router()

router.post("/", addBus);
router.get("/", getBuses);

export default router;