const Loading = () => {
  return (
    <div className="flex w-full h-full items-center justify-center h-screen bg-[#0a0a0a]">
      <div className="flex flex-col items-center gap-6">
        {/* Neon Spinner */}
        <div className="relative">
          <div className="w-14 h-14 border-4 border-transparent border-t-red-500 rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-14 h-14 border-4 border-transparent border-b-blue-500 rounded-full animate-spin-slow"></div>
        </div>

        {/* Glow Text */}
        <p
          className="text-xl font-semibold text-white tracking-wide animate-pulse
                       drop-shadow-[0_0_8px_rgba(255,0,0,0.7)]"
        >
          Loading...
        </p>
      </div>

      <style>
        {`
          .animate-spin-slow {
            animation: spin 2s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
