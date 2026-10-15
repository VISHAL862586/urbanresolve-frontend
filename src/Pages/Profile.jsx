
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Profile.css";
import { API_BASE_URL } from "../api";

function Profile() {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  // Load the saved user when the profile page opens.
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Unable to read saved user:", error);
      setUser(null);
    }
  }, []);

  // Handle input changes.
  function handleChange(e) {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  // Update the profile through the backend.
  async function updateProfile() {
    if (!user) {
      setMessage("Please login to update your profile.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/auth/update-profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(user)
        }
      );

      if (!response.ok) {
        throw new Error(`Profile update failed (${response.status})`);
      }

      const updatedUser = await response.json();

      // Update React state and the saved user.
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setEditMode(false);
      setMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      setMessage(
        "Unable to update profile. Please check your connection and login session."
      );
    } finally {
      setSaving(false);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }

  // No saved user is available.
  if (!user) {
    return (
      <>
        <Header />
        <div className="profile-container">
          <div className="profile-card">
            <h2 className="profile-title">Please login</h2>
            <p>You need to login to view your profile.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      {message && (
        <div className="profile-popup" role="status">
          {message}
        </div>
      )}

      <div className="profile-container">
        <div className="profile-card">
          <h2 className="profile-title">My Profile</h2>

          {/* Name */}
          <div className="profile-item">
            <span>Name:</span>

            {editMode ? (
              <input
                type="text"
                name="name"
                value={user.name ?? ""}
                onChange={handleChange}
                className="profile-input"
              />
            ) : (
              user.name || "Not provided"
            )}
          </div>

          {/* Email */}
          <div className="profile-item">
            <span>Email:</span>

            {editMode ? (
              <input
                type="email"
                name="email"
                value={user.email ?? ""}
                onChange={handleChange}
                className="profile-input"
              />
            ) : (
              user.email || "Not provided"
            )}
          </div>

          {/* Phone */}
          <div className="profile-item">
            <span>Phone:</span>

            {editMode ? (
              <input
                type="text"
                name="phone"
                value={user.phone ?? ""}
                onChange={handleChange}
                className="profile-input"
              />
            ) : (
              user.phone || "Not provided"
            )}
          </div>

          {/* Address */}
          <div className="profile-item">
            <span>Address:</span>

            {editMode ? (
              <input
                type="text"
                name="address"
                value={user.address ?? ""}
                onChange={handleChange}
                className="profile-input"
              />
            ) : (
              user.address || "Not provided"
            )}
          </div>

          {/* Role */}
          <div className="profile-item">
            <span>Role:</span> {user.role || "USER"}
          </div>

          {/* Buttons */}
          <div className="profile-buttons">
            {editMode ? (
              <>
                <button
                  className="save-btn"
                  onClick={updateProfile}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>

                <button
                  className="edit-btn"
                  onClick={() => {
                    const savedUser = localStorage.getItem("user");

                    if (savedUser) {
                      setUser(JSON.parse(savedUser));
                    }

                    setEditMode(false);
                    setMessage("");
                  }}
                  disabled={saving}
                >
                  Cancel
                </button>
              </>
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
