import React, { useState } from "react";
import { useNavigate } from "react-router";
import { sendOtp, resetPassword } from "../../api/userApi";
import toast from "react-hot-toast";
import { validEmailAndPassword } from "../../utils/validation";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ---------------- STEP 1 : SEND OTP ----------------
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      await sendOtp(email);
      toast.success("OTP sent successfully!");
      setStep(2);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- STEP 2 : RESET PASSWORD ----------------
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validEmailAndPassword(email, newPassword);
    if (errors.password) {
      toast.error(errors.password);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }

    setLoading(true);

    try {
      await resetPassword(email, otp, newPassword);
      toast.success("Password reset successfully!");
      navigate("/signin");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
     
      {/* CARD */}
      <div className="w-full max-w-md bg-gray-900/70 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-800">
        <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 drop-shadow">
          Scalping Strategy
        </h1>

        <h2 className="text-2xl font-semibold text-center m-8 text-gray-100">
          {step === 1 ? "Forgot Password" : "Reset Password"}
        </h2>

        {step === 1 ? (
          // ------------------- STEP 1 UI -------------------
          <form onSubmit={handleSendOtp} className="space-y-5">
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg hover:shadow-xl hover:opacity-95 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>

            <p
              className="text-center mt-4 text-blue-400 cursor-pointer hover:underline"
              onClick={() => navigate("/signin")}
            >
              Back to Sign In
            </p>
          </form>
        ) : (
          // ------------------- STEP 2 UI -------------------
          <form onSubmit={handleResetPassword} className="space-y-5">
            {/* OTP */}
            <div>
              <label className="text-gray-300 mb-1 block">OTP</label>
              <input
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-700/40 outline-none"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
              />
            </div>

            {/* New password */}
            <div>
              <label className="text-gray-300 mb-1 block">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-700/40 outline-none"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>

            {/* Confirm password */}
            <div>
              <label className="text-gray-300 mb-1 block">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-700/40 outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg hover:shadow-xl hover:opacity-95 transition disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <p
              className="text-center mt-4 text-blue-400 cursor-pointer hover:underline"
              onClick={() => navigate("/signin")}
            >
              Back to Sign In
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
