import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function BusDetails() {
  const { busId } = useParams();
  const [bus, setBus] = useState(null);
  const [seatsBooked, setSeatsBooked] = useState("");
  const [message, setMessage] = useState("");

  const fetchBus = async () => {
    try {
      const res = await api.get(`/buses/${busId}`);
      setBus(res.data);
    } catch (err) {
      console.error("Error fetching bus:", err);
    }
  };

  useEffect(() => {
    fetchBus();
  }, [busId]);

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/bookings",
        { userId, busId, seatsBooked: Number(seatsBooked) },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setMessage(`✅ Booking confirmed! ID: ${res.data.booking._id}`);
      await fetchBus();
      setSeatsBooked("");
    } catch (err) {
      setMessage(err.response?.data?.error || "❌ Booking failed");
    }
  };

  if (!bus) return <p>Loading bus details...</p>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md border-t-4 border-sky-600">
        <h2 className="text-3xl font-bold text-sky-600 mb-6 text-center">
          Bus Details
        </h2>

        <div className="space-y-2 mb-6">
          <p className="text-lg font-semibold text-gray-800">{bus.busName}</p>
          <p className="text-gray-600">{bus.busType}</p>
          <p className="text-gray-600">
            {bus.departure} → {bus.arrival}
          </p>
          <p className="text-gray-600">Seats Available: {bus.availableSeats}</p>
          <p className="text-gray-600">Price: ₹{bus.pricePerSeat}</p>
        </div>

        <form onSubmit={handleBooking} className="space-y-4">
          <input
            type="number"
            placeholder="Number of Seats"
            value={seatsBooked}
            onChange={(e) => setSeatsBooked(e.target.value)}
            min="1"
            max={bus.availableSeats}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
          />

          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-2 rounded font-semibold hover:bg-sky-700 transition"
          >
            Book Tickets
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm font-medium text-gray-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default BusDetails;
