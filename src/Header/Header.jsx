
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
      credentials: "include"
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unable to fetch user");
        }
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  const navigateTo = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include"
        }
      );

      if (!res.ok) {
        throw new Error("Logout failed");
      }

      setUser(null);
      setMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="header">
      <h2
        className="header-brand"
        onClick={() => navigateTo("/")}
      >
        UrbanResolve
      </h2>

      <button
        type="button"
        className="menu-toggle"
        onClick={() => setMenuOpen((previous) => !previous)}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <nav
        id="main-navigation"
        className={`header-nav ${menuOpen ? "menu-open" : ""}`}
      >
        <ul>
          <li>
            <button type="button" onClick={() => navigateTo("/")}>
              Home
            </button>
          </li>
          <li>
            <button type="button" onClick={() => navigateTo("/complaint")}>
              Complaint
            </button>
          </li>
          <li>
            <button type="button" onClick={() => navigateTo("/history")}>
              History
            </button>
          </li>
          <li>
            <button type="button" onClick={() => navigateTo("/contact")}>
              Contact
            </button>
          </li>
        </ul>
      </nav>

      <div className={`header-actions ${menuOpen ? "actions-open" : ""}`}>
        {!user && (
          <>
            <button type="button" onClick={() => navigateTo("/login")}>
              Login
            </button>
            <button type="button" onClick={() => navigateTo("/register")}>
              Register
            </button>
          </>
        )}

        {user && (
          <>
            <button
              type="button"
              onClick={() => navigateTo("/profile")}
            >
              👤 {user.name}
            </button>

            {user.role === "ADMIN" && (
              <>
                <button
                  type="button"
                  onClick={() => navigateTo("/admin")}
                >
                  Admin
                </button>

                <button
                  type="button"
                  onClick={() => navigateTo("/admin-news")}
                >
                  News
                </button>
              </>
            )}

            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
