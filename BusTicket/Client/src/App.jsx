import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookTicket from "./pages/BookTicket";
import CancelBooking from "./pages/CancelBooking";
import ProtectedRoute from "./components/ProtectedRoute";
import BusResults from "./pages/BusResults";

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
              path="/book"
              element={
                <ProtectedRoute>
                  <BookTicket />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cancel"
              element={
                <ProtectedRoute>
                  <CancelBooking />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </main>

      {/* ✅ Footer updated to sky blue */}
      <footer className="bg-sky-600 text-white text-center py-4">
        <p className="text-sm">
          © {new Date().getFullYear()} Bus Ticket — Bus Ticket Booking System
        </p>
      </footer>
    </div>
  );
}

export default App;
