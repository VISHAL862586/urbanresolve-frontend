import { useEffect, useState } from "react";
import "./AdminNews.css";

function AdminNews() {

  const [title, setTitle] = useState("");
  const [news, setNews] = useState([]);

  function loadNews() {
    fetch("http://localhost:8080/api/news")
      .then(res => res.json())
      .then(data => setNews(data));
  }

  useEffect(() => {
    loadNews();
  }, []);

  async function addNews() {

    await fetch(`${import.meta.env.VITE_API_URL}/api/news`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ title })
    });

    setTitle("");
    loadNews();
  }

  async function deleteNews(id) {

    await fetch(`${import.meta.env.VITE_API_URL}/api/news/${id}`, {
      method: "DELETE",
      credentials: "include"
    });

    loadNews();
  }

  return (

    <div className="news-page">

      <h2 className="news-title">
        Manage News
      </h2>

      {/* TOP FORM */}
      <div className="news-form">

        <input
          type="text"
          placeholder="Enter latest news..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="news-input"
        />

        <button
          onClick={addNews}
          className="add-news-btn"
        >
          Add News
        </button>

      </div>

      {/* NEWS LIST */}
      <div className="news-list">

        {Array.isArray(news) && news.map((n) => (

          <div className="news-card" key={n.id}>

            <p className="news-text">
              📰 {n.title}
            </p>

            <button
              onClick={() => deleteNews(n.id)}
              className="delete-news-btn"
            >
              Delete News
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AdminNews;