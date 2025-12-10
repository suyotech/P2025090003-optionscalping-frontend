// import { BrowserRouter, Routes, Route } from "react-router";
// import "./App.css";

// import Signin from "./pages/auth/Signin";
// import ForgotPassword from "./pages/auth/ForgotPassword";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Signin />} />
//         <Route path="/signin" element={<Signin />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";

import Signin from "./pages/auth/Signin";
import ForgotPassword from "./pages/auth/ForgotPassword";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Broker from "./pages/Broker";
import Logs from "./pages/Logs";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="bottom-right" toastOptions={{ duration: 5000 }} />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes (No Header) */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Main App Routes (Uses Layout + Header) */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/broker" element={<Broker />} />
            <Route path="/logs" element={<Logs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
