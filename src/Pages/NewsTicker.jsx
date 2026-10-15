import { useEffect, useState } from "react";
import "./NewsTicker.css";
import { API_BASE_URL } from "../api";

function NewsTicker() {

  const [news, setNews] = useState([]);

  useEffect(() => {

    fetch(API_BASE_URL + "/api/news")
      .then(res => res.json())
      .then(data => {

        console.log(data);

        // ✅ ensure array
        if (Array.isArray(data)) {
          setNews(data);
        } else {
          setNews([]);
        }

      })
      .catch(err => {
        console.error(err);
        setNews([]);
      });

  }, []);

  return (

    <div className="news-bar">

      <div className="news-scroll">

        {news.length > 0 ? (

          news.map((n) => (
            <span key={n.id}>
              📢 {n.title} 🔹
            </span>
          ))

        ) : (

          <span>
            📢 No announcements available
          </span>

        )}

      </div>

    </div>
  );
}

export default NewsTicker;
