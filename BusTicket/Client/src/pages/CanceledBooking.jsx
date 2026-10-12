import { useEffect, useState } from "react";
import api from "../services/api";

function CanceledBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchCanceled = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        const res = await api.get(`/bookings/canceled?userId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching canceled bookings:", err);
      }
    };
    fetchCanceled();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-4xl border-t-4 border-sky-600">
        <h2 className="text-3xl font-bold text-sky-600 mb-8 text-center">
          Canceled Bookings
        </h2>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-600">No canceled bookings.</p>
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
                <p className="mt-2 text-sky-600 font-bold">Canceled</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CanceledBookings;
