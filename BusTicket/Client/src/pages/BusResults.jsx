import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import BusCard from "../components/BusCard";

function BusResults() {
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await api.get("/buses"); 
        setBuses(res.data);
      } catch (err) {
        console.error("Failed to fetch buses", err);
      }
    };
    fetchBuses();
  }, []);

  const handleBook = (busId) => {
    navigate(`/book/${busId}`); 
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-sky-600 mb-6">Available Buses</h2>
      {buses.map((bus) => (
        <BusCard
          key={bus._id}
          busName={bus.busName}
          busType={bus.busType}
          departure={bus.departure}
          arrival={bus.arrival}
          price={bus.price}
          onBook={() => handleBook(bus._id)}
        />
      ))}
    </div>
  );
}

export default BusResults;
