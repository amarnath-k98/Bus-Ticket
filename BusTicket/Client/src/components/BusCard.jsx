function BusCard({ busName, busType, departure, arrival, price, onBook }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-sky-600 flex justify-between items-center mb-4">
      <div>
        <h3 className="text-xl font-bold text-sky-600">{busName}</h3>
        <p className="text-gray-600">{busType}</p>
        <p className="mt-2 text-gray-700">
          Departure: <span className="font-semibold">{departure}</span>
        </p>
        <p className="text-gray-700">
          Arrival: <span className="font-semibold">{arrival}</span>
        </p>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold text-green-600">₹{price}</p>
        <button
          onClick={onBook}
          className="mt-3 bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 transition"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

export default BusCard;
