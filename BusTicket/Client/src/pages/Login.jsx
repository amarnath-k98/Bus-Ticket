import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../features/userSlice";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     const res = await api.post("/users/login", { email, password });

     dispatch(setToken(res.data.token));
     localStorage.setItem("token", res.data.token);
     localStorage.setItem("userId", res.data.user._id);

     setMessage("✅ Login successful! Redirecting...");
     setTimeout(() => navigate("/"), 1500);
   } catch (err) {
     setMessage(err.response?.data?.error || "❌ Login failed");
   }
 };


  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-lg p-8 w-96 border-t-4 border-sky-600"
      >
        <h2 className="text-3xl font-bold text-sky-600 mb-6 text-center">
          Welcome Back
        </h2>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        <button
          type="submit"
          className="w-full bg-sky-600 text-white py-2 rounded font-semibold hover:bg-sky-700 transition"
        >
          Login
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
}

export default Login;
