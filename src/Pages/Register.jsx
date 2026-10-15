import "./Account.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_BASE_URL } from "../api";

function Register() {

  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: ""
  });

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      const res = await fetch(
       `${API_BASE_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(user)
        }
      );

      const data = await res.text();

      if (data === "User registered successfully") {

        setShowPopup(true);

        setTimeout(() => {

          setShowPopup(false);

          navigate("/login");

        }, 2000);

      } else {

        alert(data);
      }

    } catch (err) {

      console.error(err);

      alert("Server error");
    }
  }

  return (
    <div className="user-container">

      <form className="user-form" onSubmit={handleSubmit}>

        <h2 className="user-title">Register</h2>

        <input
          className="user-input"
          type="text"
          name="name"
          placeholder="Full Name"
          required
          onChange={handleChange}
        />

        <input
          className="user-input"
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />

        <input
          className="user-input"
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />

        <select
          className="user-input"
          name="role"
          value={user.role}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>

        <input
          className="user-input"
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          onChange={handleChange}
        />

        <textarea
          className="user-textarea"
          name="address"
          placeholder="Address"
          rows="3"
          required
          onChange={handleChange}
        ></textarea>

        <button className="user-btn" type="submit">
          Register
        </button>

        <p className="user-text">
          Already have an account?{" "}
          <span
            className="user-link"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>

      </form>

      {showPopup && (
        <div className="popup">
          Registered Successfully ✅
        </div>
      )}

    </div>
  );
}

export default Register;