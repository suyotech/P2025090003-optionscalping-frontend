
const Funds = () => {
  return (
    // Simple placeholder for Funds/Margin Details
    <div className="text-gray-400 p-4">
      <h3 className="text-lg font-semibold mb-2">Funds Details</h3>
      <div className="bg-[#1e2025] p-3 rounded-lg border border-[#2b2e35]">
        <p>
          Available Margin:{" "}
          <span className="text-green-400 font-bold">₹ 50,000</span>
        </p>
        <p>
          Used Margin: <span className="text-red-400 font-bold">₹ 15,000</span>
        </p>
      </div>
    </div>
  );
};

export default Funds;
