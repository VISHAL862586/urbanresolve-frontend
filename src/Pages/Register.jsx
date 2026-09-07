import "./Account.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function Register() {

  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOtpBox, setShowOtpBox] = useState(false);

  // ✅ Store form data
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: ""
  });

  const [image, setImage] = useState(null);

  // ✅ Handle input change
  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  // ✅ Handle form submit (API call added)
  async function handleSubmit(e) {

    e.preventDefault();

    try {

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/send-register-otp`,
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

      if (data === "OTP sent successfully") {

        alert("OTP sent to email");

        setShowOtpBox(true);

      } else {

        alert(data);
      }

    } catch (err) {

      console.error(err);

      alert("Server error");
    }
  }

  async function verifyOtp() {

    try {

      const res = await fetch(
        "http://localhost:8080/api/auth/verify-register-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({ otp })
        }
      );

      const data = await res.text();

      if (data === "Registration successful") {

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
    <>
    
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

        <select
          className="user-input"
          name="role"
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
        {
          showOtpBox && (

            <>
              <input
                className="user-input"
                type="text"
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
              />

              <button
                type="button"
                className="user-btn"
                onClick={verifyOtp}
              >
                Verify OTP
              </button>
            </>
          )
        }

        <button className="user-btn">Register</button>

        <p className="user-text">
          Already have an account?{" "}
          <span className="user-link" onClick={() => navigate("/login")}>
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
    </>
  );
}

export default Register;