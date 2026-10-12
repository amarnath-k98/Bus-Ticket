import Booking from "../models/Booking.js";
import Bus from "../models/Bus.js";

export const bookTicket = async (req, res) => {
  try {
    const { userId, busId, seatsBooked } = req.body;
    const bus = await Bus.findById(busId);

    if (bus.availableSeats < seatsBooked) {
      return res.status(400).json({ error: "Not enough seats available" });
    }

    bus.availableSeats -= seatsBooked;
    await bus.save();

    const booking = await Booking.create({
      user: userId,
      bus: busId,
      seatsBooked,
      totalPrice: seatsBooked * bus.pricePerSeat,
    });

    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("bus");
    if (!booking) {
      return res.status(400).json({ error: "Booking not found" });
    }
    booking.status = "cancelled";
    await booking.save();

    booking.bus.availableSeats += booking.seatsBooked;
    await booking.bus.save();

    res
      .status(200)
      .json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
