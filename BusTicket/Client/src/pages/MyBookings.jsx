import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        const res = await api.get(`/bookings?userId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?",
    );
    if (!confirmCancel) return;

    try {
      const token = localStorage.getItem("token");
      await api.put(
        `/bookings/cancel/${bookingId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
      navigate("/canceled");
    } catch (err) {
      console.error("Cancellation failed:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-4xl border-t-4 border-sky-600">
        <h2 className="text-3xl font-bold text-sky-600 mb-8 text-center">
          My Bookings
        </h2>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-600">No bookings found.</p>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-gray-50 rounded-lg p-6 shadow-xl shadow-sky-200 hover:shadow-md transition"
              >
                <p className="text-lg font-semibold text-sky-700 mb-2">
                  Bus: {booking.busId.busName}
                </p>
                <p className="text-gray-700">
                  {booking.busId.departure} → {booking.busId.arrival}
                </p>
                <p className="text-gray-700">Seats: {booking.seatsBooked}</p>

                <button
                  onClick={() => handleCancel(booking._id)}
                  className="mt-4 bg-sky-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition"
                >
                  Cancel Booking
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
