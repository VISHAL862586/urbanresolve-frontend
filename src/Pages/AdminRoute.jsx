import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function AdminRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading...</h2>;

  if (!user) return <Navigate to="/login" />;

  if (user.role !== "ADMIN") return <Navigate to="/" />;

  return children;
}

export default AdminRoute;