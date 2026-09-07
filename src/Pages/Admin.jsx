import { useEffect, useState } from "react";
import "./Admin.css";

function Admin() {

  const [complaints, setComplaints] = useState([]);
  const [sortType, setSortType] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch complaints
  function loadComplaints() {
    fetch(`${import.meta.env.VITE_API_URL}/api/complaints`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setComplaints(data || []))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    loadComplaints();
  }, []);

  //  Update status
  function updateStatus(id, status) {
    fetch(`${import.meta.env.VITE_API_URL}/api/complaints/${id}?status=${status}`, {
      method: "PUT",
      credentials: "include"
    })
      .then(() => loadComplaints())
      .catch(err => console.error(err));
  }

  // ✅ Delete complaint
  function deleteComplaint(id) {
    fetch(`${import.meta.env.VITE_API_URL}/api/complaints/${id}`, {
      method: "DELETE",
      credentials: "include"
    })
      .then(() => loadComplaints())
      .catch(err => console.error(err));
  }

  // Sorting + Filtering
  let filteredComplaints = [...complaints];

  //  Search by title
  filteredComplaints = filteredComplaints.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  //  Filter by status
  if (statusFilter !== "") {
    filteredComplaints = filteredComplaints.filter(
      c => c.status === statusFilter
    );
  }

  // Sort
  if (sortType === "date") {
    filteredComplaints.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  if (sortType === "location") {
    filteredComplaints.sort((a, b) =>
      a.location.localeCompare(b.location)
    );
  }

  return (
    <>
    {/* IMAGE POPUP */}
    {selectedImage && (
      <div
        className="image-modal"
        onClick={() => setSelectedImage(null)}
      >

        <img
          src={selectedImage}
          alt="Full Complaint"
          className="full-image"
        />

      </div>
    )}
    <div className="admin-container">

      <h2 className="admin-title">Admin Dashboard</h2>

      {/*  TOP CONTROLS */}
      <div className="top-controls">

        {/*  Search */}
        <input
          type="text"
          placeholder="Search complaint..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />

        {/*  Sort */}
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="filter-dropdown"
        >
          <option value="">Sort By</option>
          <option value="date">Latest Date</option>
          <option value="location">Location</option>
        </select>

        {/*  Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-dropdown"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>

      </div>

      <div className="admin-list">

        {filteredComplaints.map((c) => (
          <div className="admin-card" key={c.id}>

            <h3>{c.title}</h3>

            <p><strong>Description:</strong> {c.description}</p>

           <img
              src={`http://localhost:8080/api/complaints/image/${c.id}`}
              alt="Complaint"
              className="complaint-image"
              onClick={() =>
                setSelectedImage(
                  `http://localhost:8080/api/complaints/image/${c.id}`
                )
              }
            />

            {/* User */}
            <p>👤 <strong>User:</strong> {c.user?.name}</p>

            {/* 📍 Location */}
            <p><strong>Location:</strong> {c.location}</p>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${c.location}`}
              target="_blank"
              rel="noreferrer"
            >
              📍 View on Map
            </a>

            {/* ✅ Priority */}
            <p>
              <strong>Priority:</strong> {c.priority}
            </p>

            {/* ✅ Date */}
            <p>
              <strong>Date:</strong>{" "}
              {new Date(c.createdAt).toLocaleString()}
            </p>

            {/* ✅ Status */}
            <p><strong>Status:</strong> {c.status}</p>

            {/* ✅ Status Dropdown */}
            <select
              className="status-dropdown"
              value={c.status}
              onChange={(e) => updateStatus(c.id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

            {/* ❌ Delete */}
            <button
              className="delete-btn"
              onClick={() => deleteComplaint(c.id)}
            >
              Delete
            </button>

          </div>
        ))}

      </div>

    </div>
     </>
  );
 
}

export default Admin;