import BusCard from "../components/BusCard";

function BusResults() {
  const buses = [
    {
      busName: "KPN Travels",
      busType: "AC Sleeper",
      departure: "10:00 AM",
      arrival: "6:00 PM",
      price: 1200,
    },
    {
      busName: "Parveen Travels",
      busType: "Non-AC Seater",
      departure: "11:30 AM",
      arrival: "7:30 PM",
      price: 800,
    },
  ];

  const handleBook = (bus) => {
    alert(`Booking bus: ${bus.busName}`);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-sky-600 mb-6">Available Buses</h2>
      {buses.map((bus, index) => (
        <BusCard
          key={index}
          busName={bus.busName}
          busType={bus.busType}
          departure={bus.departure}
          arrival={bus.arrival}
          price={bus.price}
          onBook={() => handleBook(bus)}
        />
      ))}
    </div>
  );
}

export default BusResults;
