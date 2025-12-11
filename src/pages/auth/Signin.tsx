import React, { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { loginUser } from "../../api/userApi";
import { validEmailAndPassword } from "../../utils/validation";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Signin: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // ✅ New state

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validEmailAndPassword(email, password);
    if (errors.email) return toast.error(errors.email);
    if (errors.password) return toast.error(errors.password);

    setLoading(true);

    try {
      const res = await loginUser(email, password);

      const accessToken = res.data.access_token;
      const refreshToken = res.data.refresh_token;
console.log("token", accessToken, refreshToken);

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
      <div className="w-full max-w-md h-150 bg-gray-900/70 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-800">
        <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 drop-shadow">
         Options Scalping 
        </h1>

        <h2 className="text-2xl font-semibold text-center m-8 text-gray-100">
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
          <div className="relative">
            <label className="text-gray-300 mb-1 block">Password</label>
            <input
              type={showPassword ? "text" : "password"} // ✅ Toggle type
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-700/40 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            {/* Eye Icon */}
            <div
              className="absolute right-3 top-11 cursor-pointer text-gray-500 hover:text-gray-800"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </div>
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
