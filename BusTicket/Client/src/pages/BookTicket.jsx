import { useState } from "react";
import api from "../services/api";

function BookTicket() {
  const [busId, setBusId] = useState("");
  const [seatsBooked, setSeatsBooked] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = "123";
      const res = await api.post("/bookings", {
        userId,
        busId,
        seatsBooked,
      });
      setMessage(`✅ Booking confirmed! ID: ${res.data._id}`);
    } catch (err) {
      setMessage(err.response?.data?.error || "❌ Booking failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-lg p-8 w-96 border-t-4 border-sky-600"
      >
        <h2 className="text-3xl font-bold text-sky-600 mb-6 text-center">
          Book Your Ticket
        </h2>

        <input
          type="text"
          placeholder="Enter Bus ID"
          value={busId}
          onChange={(e) => setBusId(e.target.value)}
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        <input
          type="number"
          placeholder="Number of Seats"
          value={seatsBooked}
          onChange={(e) => setSeatsBooked(e.target.value)}
          className="w-full p-3 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        <button
          type="submit"
          className="w-full bg-sky-600 text-white py-2 rounded font-semibold hover:bg-sky-700 transition"
        >
          Confirm Booking
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
}

export default BookTicket;
