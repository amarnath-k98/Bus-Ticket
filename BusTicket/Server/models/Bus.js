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
    route: { type: mongoose.Schema.Types.ObjectId, ref: "Route", required: true },
    pricePerSeat: { type: Number, required: true },
  },
  { timestamps: true },
);

const Bus = mongoose.model("Bus", busSchema);
export default Bus;
