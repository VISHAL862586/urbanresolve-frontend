import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // 🔹 check login status
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  // 🔹 logout function
  const handleLogout = async () => {
  console.log("Calling correct logout...");

  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include"
  });

  console.log("Response status:", res.status);

  setUser(null);
  navigate("/");
};

  return (
    <div className="header">
      <h2>UrbanResolve</h2>

      <nav>
        <ul>
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/complaint")}>Complaint</li>
          <li onClick={() => navigate("/history")}>History</li>
          <li onClick={() => navigate("/contact")}>Contact</li>
        </ul>
      </nav>

      <div>
        {/* 🔹 NOT LOGGED IN */}
        {!user && (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </>
        )}

        {/* 🔹 LOGGED IN */}
        {user && (
          <>
            <button onClick={() => navigate("/profile")}>
              👤 {user.name}
            </button>

          {user.role === "ADMIN" && (
              <>
                <button onClick={() => navigate("/admin")}>
                  Admin
                </button>

                <button onClick={() => navigate("/admin-news")}>
                  News
                </button>
              </>
            )}

            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;