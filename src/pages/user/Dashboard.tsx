

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#0d0f12] text-white p-4">
      <h1 className="text-xl font-bold mb-4">Trading Terminal</h1>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-4">
          {/* Index Configuration */}
          <div className="bg-[#15181d] p-4 rounded-lg shadow-md">
            <h2 className="text-sm font-semibold mb-3">INDEX CONFIGURATION</h2>
            <div className="space-y-3">
              {["NIFTY", "BANKN", "SENSEX"].map((item) => (
                <div key={item} className="grid grid-cols-7 gap-2 text-xs">
                  <div className="col-span-1 font-semibold">{item}</div>
                  <select className="bg-[#20242b] p-2 rounded">
                    {" "}
                    <option>1</option>{" "}
                  </select>
                  <select className="bg-[#20242b] p-2 rounded">
                    {" "}
                    <option>3</option>{" "}
                  </select>
                  <select className="bg-[#20242b] p-2 rounded">
                    {" "}
                    <option>3</option>{" "}
                  </select>
                  <select className="bg-[#20242b] p-2 rounded">
                    {" "}
                    <option>120</option>{" "}
                  </select>
                  <select className="bg-[#20242b] p-2 rounded">
                    {" "}
                    <option>300</option>{" "}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Strike Selection */}
          <div className="bg-[#15181d] p-4 rounded-lg shadow-md">
            <h2 className="text-sm font-semibold mb-3">STRIKE SELECTION</h2>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-700">
                  <th className="p-2">INDEX</th>
                  <th className="p-2">STRIKE</th>
                  <th className="p-2">CAPITAL LOTS</th>
                  <th className="p-2">LOTS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2">NIFTY</td>
                  <td className="p-2">₹200+</td>
                  <td className="p-2">50000</td>
                  <td className="p-2">3</td>
                </tr>
                <tr>
                  <td className="p-2">BANKN</td>
                  <td className="p-2">₹500+</td>
                  <td className="p-2">50000</td>
                  <td className="p-2">3</td>
                </tr>
                <tr>
                  <td className="p-2">SENSEX</td>
                  <td className="p-2">₹300+</td>
                  <td className="p-2">50000</td>
                  <td className="p-2">3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="space-y-4 bg-[#15181d] p-4 rounded-lg shadow-md">
          <h2 className="text-sm font-semibold mb-3">OPERATIONS</h2>

          {["NIFTY", "BANKN", "SENSEX"].map((item) => (
            <div key={item}>
              <h3 className="text-xs mb-1">{item}</h3>
              <div className="grid grid-cols-6 gap-2 text-xs">
                <button className="bg-blue-600 py-2 rounded">NC</button>
                <button className="bg-blue-600 py-2 rounded">NP</button>
                <button className="bg-blue-600 py-2 rounded">BC</button>
                <button className="bg-blue-600 py-2 rounded">BP</button>
                <button className="bg-red-600 py-2 rounded">EXIT C</button>
                <button className="bg-red-600 py-2 rounded">EXIT P</button>
              </div>
            </div>
          ))}

          <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
            <button className="bg-red-600 py-2 rounded">EXIT CALL</button>
            <button className="bg-red-600 py-2 rounded">
              CLOSE ALL POSITIONS
            </button>
            <button className="bg-red-600 py-2 rounded col-span-2">
              CANCEL ALL ORDERS
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="bg-[#15181d] mt-4 p-4 rounded-lg shadow-md">
        <div className="flex gap-4 mb-3 text-xs">
          <button className="px-3 py-1 bg-[#20242b] rounded">POSITIONS</button>
          <button className="px-3 py-1 bg-[#20242b] rounded">ORDER BOOK</button>
          <button className="px-3 py-1 bg-[#20242b] rounded">TRADE BOOK</button>
          <button className="px-3 py-1 bg-[#20242b] rounded">FUNDS</button>
        </div>

        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400">
              <th className="p-2">SYMBOL</th>
              <th className="p-2">TARGET</th>
              <th className="p-2">SL</th>
              <th className="p-2">EXECUTED</th>
              <th className="p-2">LTP</th>
              <th className="p-2">MTM</th>
              <th className="p-2">STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">NIFTY 24500 CE</td>
              <td className="p-2">150</td>
              <td className="p-2">120</td>
              <td className="p-2">135</td>
              <td className="p-2">142</td>
              <td className="p-2 text-green-400">+700</td>
              <td className="p-2 text-green-400">ACTIVE</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;