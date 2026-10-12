import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = useSelector((state) => state.user.token);

  if (!token) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 border-t-4 border-sky-600 text-center">
          <h2 className="text-2xl font-bold text-sky-600 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-700 mb-6">
            You must be logged in to view this page.
          </p>
          <Navigate to="/login" replace />
        </div>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
