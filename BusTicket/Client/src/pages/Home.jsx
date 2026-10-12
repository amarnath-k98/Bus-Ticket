import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Home() {
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await api.get("/buses");
        setBuses(res.data);
      } catch (err) {
        console.error("Error fetching buses:", err);
      }
    };
    fetchBuses();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-4xl border-t-4 border-sky-600">
        <h1 className="text-3xl font-bold text-sky-600 mb-8 text-center">
          Available Buses
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          {buses.map((bus) => (
            <div
              key={bus._id}
              className="bg-gray-100   rounded-lg p-6 shadow-xl shadow-sky-200 hover:shadow-lg cursor-pointer transition"
              onClick={() => navigate(`/bus/${bus._id}`)}
            >
              <h3 className="text-xl font-semibold text-sky-600 mb-2">
                {bus.busName}
              </h3>
              <p className="text-gray-700">{bus.busType}</p>
              <p className="text-gray-700">
                {bus.departure} → {bus.arrival}
              </p>
              <p className="text-gray-700">₹{bus.pricePerSeat} per seat</p>
              <p className="text-gray-700">
                Seats Available: {bus.availableSeats}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
