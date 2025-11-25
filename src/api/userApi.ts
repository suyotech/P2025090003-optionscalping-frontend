
import axiosInstance from "./axiosInstance";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// ------------- Interfaces ----------------
// Interfaces
export interface SignInResponse {
  status: number;
  error: boolean;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
  };
}




export interface SendOtpResponse {
  message: string;
}

export interface ResetPasswordResponse {
  message: string;
}

// ------------- API Functions ----------------


// Login
export const loginUser = async (email: string, password: string): Promise<SignInResponse> => {
  const res = await axiosInstance.post("/auth/signin", { email, password });
  return res.data;
};


// Send OTP (axiosInstance with token)
export async function sendOtp(email: string): Promise<SendOtpResponse> {
  const res = await axiosInstance.post("/auth/forgot-password", { email });
  return res.data;
}

// Reset password (axiosInstance with token)
export async function resetPassword(
  email: string,
  otp: string,
  new_password: string
): Promise<ResetPasswordResponse> {
  const res = await axiosInstance.post("/auth/reset-password", {
    email,
    otp,
    new_password,
  });
  return res.data;
}
// Get current user profile
export async function getProfile() {
  const res = await axiosInstance.get("/users/profile");
  return res.data.data;
}

// Logout
export function logoutUser() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}
