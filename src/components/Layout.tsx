import { Outlet } from "react-router";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#0d0f12] text-white">
      <Header />
      <main className="p-2 pt-16  flex">
       
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
