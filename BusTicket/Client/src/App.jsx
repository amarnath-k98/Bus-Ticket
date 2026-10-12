import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import BusResults from "./pages/BusResults";
import BusDetails from "./pages/BusDetails";
import CanceledBookings from "./pages/CanceledBooking";
import MyBookings from "./pages/MyBookings";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="grow">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<BusResults />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/bus/:busId"
              element={
                <ProtectedRoute>
                  <BusDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <ProtectedRoute>
                  <MyBookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/canceled"
              element={
                <ProtectedRoute>
                  <CanceledBookings />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </main>

      <footer className="bg-sky-600 text-white text-center py-4">
        <p className="text-sm">
          © {new Date().getFullYear()} Bus Ticket — Bus Ticket Booking System
        </p>
      </footer>
    </div>
  );
}

export default App;
