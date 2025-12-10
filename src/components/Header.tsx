import { Link, useLocation } from "react-router";

const Header = () => {
  const location = useLocation();
  const active = location.pathname;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-black text-white 
                       px-6 py-4 flex justify-between items-center 
                       shadow-lg "
    >
      <h1 className="text-xl font-bold text-red-500">Options Scalping</h1>

      <nav className="flex gap-6 cursor-pointer scale-95">
        <Link
          to="/dashboard"
          className={`text-lg ${
            active === "/dashboard"
              ? "text-blue-400 "
              : "text-gray-300 hover:text-red-400"
          }`}
        >
          Dashboard
        </Link>

        <Link
          to="/broker"
          className={`text-lg ${
            active === "/broker"
              ? "text-blue-400 "
              : "text-gray-300 hover:text-red-400"
          }`}
        >
          Broker
        </Link>

        <Link
          to="/logs"
          className={`text-lg ${
            active === "/logs"
              ? "text-blue-400 "
              : "text-gray-300 hover:text-red-400"
          }`}
        >
          Logs
        </Link>
      </nav>
    </header>
  );
};

export default Header;
