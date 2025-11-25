import React, { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { loginUser } from "../../api/userApi";
import { validEmailAndPassword } from "../../utils/validation";

const Signin: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email & password
    const errors = validEmailAndPassword(email, password);

    if (errors.email) {
      toast.error(errors.email);
      return;
    }
    if (errors.password) {
      toast.error(errors.password);
      return;
    }

    setLoading(true);

    try {
      const res = await loginUser(email, password);

      const accessToken = res.data.access_token;
      const refreshToken = res.data.refresh_token;

      if (!accessToken) {
        toast.error("Login failed. Please try again.");
        return;
      }

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken || "");

      toast.success("Login successful!");

      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      {/* HEADER (optional) */}
      <div className="absolute top-6 text-center">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 drop-shadow">
          Scalping Strategy
        </h1>
      </div>

      {/* CARD */}
      <div className="w-full max-w-md bg-gray-900/70 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-800">
        <h2 className="text-2xl font-semibold text-center mb-8 text-gray-100">
          Sign In
        </h2>

        <form onSubmit={handleSignin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-gray-300 mb-1 block">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-700/40 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-300 mb-1 block">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-700/40 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          {/* Forgot Password */}
          <p
            className="text-right text-blue-400 cursor-pointer hover:underline text-sm"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </p>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg hover:shadow-xl hover:opacity-95 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        
      </div>
    </div>
  );
};

export default Signin;
