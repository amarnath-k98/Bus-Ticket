import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/results", { state: { from, to, date, passengers } });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-sky-600 mb-4">
          Book Bus Tickets Easily
        </h1>
        <p className="text-gray-700 text-lg">
          Fast, reliable, and secure — just like RedBus
        </p>
      </div>

      <form
        onSubmit={handleSearch}
        className="bg-white shadow-xl rounded-lg p-8 w-full max-w-3xl flex flex-wrap gap-4 justify-center border-t-4 border-sky-600"
      >
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="flex-1 min-w-37.5 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="flex-1 min-w-37.5 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="flex-1 min-w-37.5 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <input
          type="number"
          min="1"
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
          className="flex-1 min-w-25 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <button
          type="submit"
          className="bg-sky-600 text-white px-6 py-3 rounded font-semibold hover:bg-sky-700 transition"
        >
          Search Buses
        </button>
      </form>
    </div>
  );
}

export default Home;
