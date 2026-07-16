import "./Account.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [showOtpBox, setShowOtpBox] =
    useState(false);

  const [showPopup, setShowPopup] =
    useState(false);

  const [timer, setTimer] =
    useState(30);

  const [resendDisabled, setResendDisabled] =
    useState(true);

  const [popupMessage, setPopupMessage] =
    useState("");

  const [popupType, setPopupType] =
    useState("");

  // =========================
  // SEND OTP
  // =========================

  async function sendOtp() {

    try {

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/send-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({ email })
        }
      );

      const message = await res.text();

      // USER NOT FOUND
      if (message.includes("User not found")) {

       setPopupMessage(message);

        setPopupType("error");

        setTimeout(() => {
          setPopupMessage("");
        }, 1000);

        return;
      }

      // SUCCESS
      setPopupMessage("OTP Sent Successfully ✅");

      setPopupType("success");

      setTimeout(() => {
        setPopupMessage("");
      }, 1000);

      setShowOtpBox(true);

      setTimer(20);

      setResendDisabled(true);

      startTimer();

    } catch (err) {

      console.error(err);

      alert("Something went wrong");
    }
  }

  // =========================
  // TIMER
  // =========================

  function startTimer() {

    let count = 60;
    const interval = setInterval(() => {

      count--;

      setTimer(count);

      if (count <= 0) {

        clearInterval(interval);

        setResendDisabled(false);
      }

    }, 500);
  }

  // =========================
  // VERIFY OTP
  // =========================

  async function verifyOtp() {

    try {

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            otp
          })
        }
      );

      if (!res.ok) {
        throw new Error("Invalid OTP");
      }
      const user = await res.json();

      console.log("Logged in user:", user);

      // Check whether session exists
    const me = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/me`,
        {
            credentials: "include"
        }
    );

    console.log("ME STATUS:", me.status);

    const text = await me.text();

    console.log("ME RESPONSE:", text);

      setShowPopup(true);

      setTimeout(() => {
          setShowPopup(false);
          navigate("/");
      }, 2000);

    } catch (err) {

      console.error(err);

      setPopupMessage("Invalid OTP ❌");

      setPopupType("error");

      setTimeout(() => {
        setPopupMessage("");
      }, 2000);
    }
  }

  // =========================
  // RESEND OTP
  // =========================

  function resendOtp() {

    sendOtp();
  }

  return (

    <>

    {popupMessage && (

      <div className={`custom-popup ${popupType}`}>

        {popupMessage}

      </div>
    )}

    <div className="user-container">

      <div className="user-form">

        <h2>OTP Login</h2>

        {/* EMAIL */}
        <input
          className="user-input"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        {/* SEND OTP */}
        {!showOtpBox && (

          <button
            className="user-btn"
            onClick={sendOtp}
          >
            Send OTP
          </button>
        )}

        {/* OTP SECTION */}
        {showOtpBox && (

          <>

            <input
              className="user-input"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value)
              }
            />

            <button
              className="user-btn"
              onClick={verifyOtp}
            >
              Verify OTP
            </button>

            {/* TIMER */}
            {timer > 0 ? (

              <p className="otp-timer">
                Resend OTP in {timer}s
              </p>

            ) : (

              <button
                className="resend-btn"
                disabled={resendDisabled}
                onClick={resendOtp}
              >
                Resend OTP
              </button>
            )}

          </>
        )}

        <p className="user-text">
          Don’t have an account?

          <span
            className="user-link"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

      </div>

      {/* SUCCESS POPUP */}
      {showPopup && (

        <div className="popup">
          Login Successfully ✅
        </div>
      )}

    </div>
    </>
  );
}

export default Login;