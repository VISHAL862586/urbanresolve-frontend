import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Complaint from "./Pages/Complaint"
import History from './Pages/History'
import Admin from "./Pages/Admin";
import AdminRoute from "./Pages/AdminRoute";
import Profile from "./Pages/Profile";
import AdminNews from "./Pages/AdminNews";
import Contact from "./Pages/Contact";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/history" element={<History />} />
         <Route path="/profile" element={<Profile />} />
         <Route path="/contact" element={<Contact />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin-news"
          element={
            <AdminRoute>
              <AdminNews />
            </AdminRoute>
          }
        />

      </Routes>
     
    </BrowserRouter>
  );
  
}

export default App;