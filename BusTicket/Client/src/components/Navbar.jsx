import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../features/userSlice";

function Navbar() {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearToken());
    localStorage.removeItem("token");
    localStorage.removeItem("userId"); 
    navigate("/login");
  };

  return (
    <nav className="bg-sky-600 text-white px-8 py-4 flex justify-between items-center shadow-md">
      {/* ✅ Clicking Bus Ticket now navigates to Home */}
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide hover:text-sky-200"
      >
        Bus Ticket
      </Link>

      <div className="space-x-6 flex items-center">
        {!token ? (
          <>
            <Link
              to="/login"
              className="hover:text-sky-200 transition font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hover:text-sky-200 transition font-medium"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/my-bookings"
              className="hover:text-sky-200 transition font-medium"
            >
              My Bookings
            </Link>
            <Link
              to="/canceled"
              className="hover:text-sky-200 transition font-medium"
            >
              Canceled
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white text-sky-600 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
