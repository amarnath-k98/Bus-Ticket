import mongoose from "mongoose";

const routeSchema = new mongoose.Schema(
  {
    source: { type: String, required: true },
    destination: { type: String, required: true },
    distanceKm: { type: Number, required: true },
    durationHours: { type: Number, required: true },
  },
  { timestamps: true },
);

const Route = mongoose.model("Route", routeSchema);
export default Route;
