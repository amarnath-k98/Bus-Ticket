import express from "express";
import {
  bookTicket,
  cancelBooking,
  getUserBookings,
  getCanceledBookings,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", bookTicket);
router.put("/cancel/:id", cancelBooking);
router.get("/", getUserBookings);
router.get("/canceled", getCanceledBookings);

export default router;
