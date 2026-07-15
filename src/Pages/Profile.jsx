import { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Profile.css";

function Profile() {

  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  // ✅ Handle input change
  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  // ✅ Update profile
  async function updateProfile() {

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/update-profile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(user)
      }
    );

    if (response.ok) {

      const updatedUser = await response.json();

      setUser(updatedUser);

      // ✅ Success popup
      setMessage("Profile Updated Successfully ✅");

      setEditMode(false);

      // Auto remove popup after 3 sec
      setTimeout(() => {
        setMessage("");
      }, 3000);

    } else {

      setMessage("Update Failed ❌");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }

  if (!user)
    return <h2 style={{ color: "white" }}>Please login</h2>;

  return (
    <>
      <Header />
        {message && (
          <div className="profile-popup">
            {message}
          </div>
        )}

      <div className="profile-container">

        <div className="profile-card">

          <h2 className="profile-title">
            My Profile
          </h2>

          {/* NAME */}
          <div className="profile-item">
            <span>Name:</span>

            {editMode ? (
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="profile-input"
              />
            ) : (
              user.name
            )}
          </div>

          {/* EMAIL */}
          <div className="profile-item">
            <span>Email:</span>

            {editMode ? (
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="profile-input"
              />
            ) : (
              user.email
            )}
          </div>

          {/* PHONE */}
          <div className="profile-item">
            <span>Phone:</span>

            {editMode ? (
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className="profile-input"
              />
            ) : (
              user.phone
            )}
          </div>

          {/* ADDRESS */}
          <div className="profile-item">
            <span>Address:</span>

            {editMode ? (
              <input
                type="text"
                name="address"
                value={user.address}
                onChange={handleChange}
                className="profile-input"
              />
            ) : (
              user.address
            )}
          </div>

          {/* ROLE */}
          <div className="profile-item">
            <span>Role:</span> {user.role}
          </div>

          {/* BUTTONS */}
          <div className="profile-buttons">

            {editMode ? (
              <button
                className="save-btn"
                onClick={updateProfile}
              >
                Save Changes
              </button>
            ) : (
              <button
                className="edit-btn"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            )}

          </div>

        </div>

      </div>
    </>
  );
}

export default Profile;