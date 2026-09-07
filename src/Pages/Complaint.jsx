import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./Complaint.css";
function Complaint() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [priority, setPriority] = useState("");
  const [popupMsg, setPopupMsg] = useState("");

  const navigate = useNavigate(); 

  function handleImage(e) {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

async function handleSubmit(e) {

  e.preventDefault();

  try {

    const formData = new FormData();

    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("priority", priority);
    formData.append("image", image);

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/complaints`,
      {
        method: "POST",
        credentials: "include",
        body: formData
      }
    );

    // NOT LOGGED IN
    if (res.status === 401) {

      setPopupMsg("⚠️ Please login");

      setShowPopup(true);

      setTimeout(() => {

        setShowPopup(false);

        navigate("/login");

      }, 2000);

      return;
    }

    const data = await res.json();

    console.log(data);

    setPopupMsg("Complaint Submitted Successfully ✅");

    setShowPopup(true);

    setTimeout(() => {

      setShowPopup(false);

      navigate("/");

    }, 2000);

  } catch (err) {

    console.error(err);

    setPopupMsg("Something went wrong ❌");

    setShowPopup(true);

    setTimeout(() => {

      setShowPopup(false);

    }, 2000);
  }
}

  return (
    <>
   <Header/>
    <div className="complaint-container">
      <form className="complaint-form" onSubmit={handleSubmit}>
        <h2 className="complaint-title">Register Complaint</h2>

       <input
          className="complaint-input"
          type="text"
          placeholder="Complaint Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="complaint-input"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option>Garbage</option>
          <option>Water Supply</option>
          <option>Road Damage</option>
          <option>Electricity</option>
          <option>Other</option>
        </select>

        <textarea
          className="complaint-textarea"
          rows="4"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

       <input
          className="complaint-input"
          type="text"
          placeholder="Location"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

       <select
          className="complaint-select"
          placeholder="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">Select Priority</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          className="complaint-input"
          type="file"
          onChange={handleImage}
        />

        {preview && (
          <img src={preview} alt="preview" className="preview-img" />
        )}

        <button className="complaint-btn">Submit Complaint</button>
      </form>

      {showPopup && (
        <div className="popup">
          {popupMsg}
        </div>
      )}
    </div>
     </>
  );
}

export default Complaint;