import { Outlet } from "react-router";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="h-screen bg-[#0d0f12] overflow-hidden text-white">
      <Header />
      <main className="p-2 pt-16 overflow-auto flex">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
