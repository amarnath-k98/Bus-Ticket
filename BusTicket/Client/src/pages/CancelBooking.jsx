import { useState } from "react";
import api from "../services/api";

function CancelBooking() {
  const [bookingId, setBookingId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/bookings/cancel/${bookingId}`);
      setMessage(`✅ Booking cancelled successfully! ID: ${res.data._id}`);
    } catch (err) {
      setMessage(err.response?.data?.error || "❌ Cancellation failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-lg p-8 w-96 border-t-4 border-sky-600"
      >
        <h2 className="text-3xl font-bold text-sky-600 mb-6 text-center">
          Cancel Your Booking
        </h2>

        <input
          type="text"
          placeholder="Enter Booking ID"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
          className="w-full p-3 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        <button
          type="submit"
          className="w-full bg-sky-600 text-white py-2 rounded font-semibold hover:bg-sky-700 transition"
        >
          Cancel Booking
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
}

export default CancelBooking;
