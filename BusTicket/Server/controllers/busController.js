import Bus from "../models/Bus.js";

export const addBus = async (req, res) => {
  try {
    const bus = await Bus.create(req.body);
    res.status(201).json(bus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getBuses = async (req, res) => {
  try {
    const { source, destination } = req.query;
    const buses = await Bus.find().populate("route");

    const filtered = buses.filter(
      (bus) =>
        bus.route.source === source && bus.route.destination === destination,
    );

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
