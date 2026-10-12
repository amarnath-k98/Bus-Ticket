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
    const { departure, arrival } = req.query;

    let query = {};
    if (departure) query.departure = departure;
    if (arrival) query.arrival = arrival;

    const buses = await Bus.find(query);

    res.json(buses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(404).json({ error: "Bus not found" });
    res.json(bus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
