import mongoose from "mongoose";

const busSchema = new mongoose.Schema(
  {
    busName: { type: String, required: true },
    busType: {
      type: String,
      enum: ["AC", "Non-AC", "Sleeper"],
      required: true,
    },
    totalSeats: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    departure: { type: String, required: true },
    departureTime: { type: Number, required: true },
    arrival: { type: String, required: true },
    pricePerSeat: { type: Number, required: true },
  },
  { timestamps: true },
);

const Bus = mongoose.model("Bus", busSchema);
export default Bus;
