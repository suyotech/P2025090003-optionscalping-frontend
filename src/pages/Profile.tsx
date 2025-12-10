import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineEmail, MdDateRange } from "react-icons/md";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  totalOrders?: number;
  activePositions?: number;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/secure/profile");
      setProfile(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-gray-300 text-lg animate-pulse">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <p className="text-gray-300 text-lg">No profile data found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-5">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700 p-8 flex flex-col items-center">
        {/* Avatar */}
        <div className="bg-gradient-to-tr from-blue-500 to-teal-400 rounded-full p-1 shadow-xl">
          <FaUserCircle className="text-white text-6xl rounded-full bg-gray-800 p-2" />
        </div>

        {/* Name & Email */}
        <h1 className="text-3xl font-bold text-white mt-4">{profile.name}</h1>
        <p className="text-gray-300 text-sm mb-6 flex items-center gap-1">
          <MdOutlineEmail /> {profile.email}
        </p>

        {/* Info Card */}
        <div className="w-full bg-gray-800/70 rounded-xl shadow-inner p-6 grid grid-cols-1 gap-4 text-gray-200">
          <div className="flex justify-between items-center border-b border-gray-700 pb-2">
            <span className="font-semibold">User ID:</span>
            <span>{profile.id}</span>
          </div>
          {profile.createdAt && (
            <div className="flex justify-between items-center border-b border-gray-700 pb-2">
              <span className="font-semibold flex items-center gap-1">
                <MdDateRange /> Joined
              </span>
              <span>{new Date(profile.createdAt).toLocaleDateString()}</span>
            </div>
          )}
          {/* Optional stats */}
          {profile.totalOrders !== undefined && (
            <div className="flex justify-between items-center border-b border-gray-700 pb-2">
              <span className="font-semibold">Total Orders</span>
              <span>{profile.totalOrders}</span>
            </div>
          )}
          {profile.activePositions !== undefined && (
            <div className="flex justify-between items-center pb-2">
              <span className="font-semibold">Active Positions</span>
              <span>{profile.activePositions}</span>
            </div>
          )}
        </div>

       
      </div>
    </div>
  );
};

export default Profile;
