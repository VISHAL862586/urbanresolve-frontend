import { useState, useEffect } from "react";
import Header from "../Header/Header";
import "./History.css";

function History() {

  const [filter, setFilter] = useState("All");
  const [sortType, setSortType] = useState("latest"); 

  const [complaints, setComplaints] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/complaints`, {
      credentials: "include"
    })
      .then((res) => {

        // 🔥 HANDLE LOGOUT CASE
        if (res.status === 401) {
          // user not logged in → redirect
          window.location.href = "/login";
          return;
        }

        if (!res.ok) {
          throw new Error("Server error");
        }

        return res.json();
      })
      .then((data) => {
        if (data) {
          setComplaints(data);
        }
      })
      .catch((err) => {
        console.error(err);
        setComplaints([]);
      });
  }, []);

  
  const filteredData = (complaints || [])
    .filter((item) => {
      return filter === "All" || item.status?.trim() === filter;
    })
    .sort((a, b) => {
      if (sortType === "latest") {
        return new Date(b.date) - new Date(a.date);
      } else {
        return new Date(a.date) - new Date(b.date);
      }
  });

  return (
    <>
    <Header/>
    <div className="history-container">
      <h2 className="history-title">Complaint History</h2>

      <div className="filter-buttons">
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Pending")}>Pending</button>
        <button onClick={() => setFilter("In Progress")}>In Progress</button>
        <button onClick={() => setFilter("Resolved")}>Resolved</button>
      </div>

      <div className="sort-buttons">
        <button onClick={() => setSortType("latest")}>Latest</button>
        <button onClick={() => setSortType("oldest")}>Oldest</button>
      </div>

      <div className="history-list">
        {filteredData.map((item) => (
          <div className="history-card" key={item.id}>
            <h3>{item.title}</h3>

            <p><strong>Category:</strong> {item.category}</p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(item.date).toLocaleDateString()}
            </p>

            <p><strong>Priority:</strong> {item.priority}</p>

            <span className={`status ${item.status.replace(" ", "")}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
      {filteredData.length === 0 && (
        <p style={{ color: "white", textAlign: "center" }}>
          No complaints found
        </p>
      )}
    </div>
    </>
  );
}

export default History;