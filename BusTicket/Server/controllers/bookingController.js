import Booking from "../models/Booking.js";
import Bus from "../models/Bus.js";

export const bookTicket = async (req, res) => {
  try {
    const { userId, busId, seatsBooked } = req.body;

    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ error: "Bus not found" });

    if (bus.availableSeats < seatsBooked) {
      return res.status(400).json({ error: "Not enough seats available" });
    }

    bus.availableSeats -= seatsBooked;
    await bus.save();

    const booking = await Booking.create({
      userId,
      busId,
      seatsBooked,
      totalPrice: seatsBooked * bus.pricePerSeat,
      status: "active",
    });

    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("busId");
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    booking.status = "canceled";
    await booking.save();

    const bus = await Bus.findById(booking.busId);
    if (bus) {
      bus.availableSeats += booking.seatsBooked;
      await bus.save();
    }

    res.json({ message: "Booking canceled", booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.query;
    const bookings = await Booking.find({ userId, status: "active" }).populate("busId");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCanceledBookings = async (req, res) => {
  try {
    const { userId } = req.query;
    const bookings = await Booking.find({ userId, status: "canceled" }).populate("busId");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
