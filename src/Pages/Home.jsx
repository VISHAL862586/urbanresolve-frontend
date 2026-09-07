import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./Home.css";
import NewsTicker from "./NewsTicker";



function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <NewsTicker />  
      <div className="Hero">
        <section className="hero">
          <div className="hero-content">
            <h1>Register Your Complaint Easily</h1>
            <p>
              Report issues like garbage, water, roads and track status easily.
            </p>
            <button className="hero-btn" onClick={() => navigate("/complaint")}>
              Raise Complaint
            </button>
          </div>
        </section>

                {/* SOLVED COMPLAINTS GALLERY */}

        <div className="gallery">

          <h2>Recently Solved Complaints</h2>

          <div className="gallery-box">

            <div className="gallery-card">
              <img
                src="https://c8.alamy.com/comp/BXMP8D/cleaning-the-streets-of-pondicherry-tamil-nadu-india-BXMP8D.jpg"
                alt="Garbage Solved"
              />

              <h3>Garbage Cleaned</h3>

              <p>
                Overflowing garbage issue resolved successfully.
              </p>
            </div>

            <div className="gallery-card">
              <img
                src="https://thumbs.dreamstime.com/b/asphalting-repair-roads-workers-paver-machine-road-street-repairing-works-53004001.jpg"
                alt="Road Repair"
              />

              <h3>Road Repaired</h3>

              <p>
                Damaged road repaired by municipal authority.
              </p>
            </div>

            <div className="gallery-card">
              <img
                src="https://www.shutterstock.com/shutterstock/photos/710223934/display_1500/stock-photo-upvc-pipe-burst-710223934.jpg"
                alt="Water Supply"
              />

              <h3>Water Leakage Fixed</h3>

              <p>
                Water pipeline leakage issue resolved.
              </p>
            </div>

          </div>
        </div>

        <div className="features">
          <h2>Our Services</h2>

          <div className="feature-box">
            <div>🗑 Garbage Issues</div>
            <div>💧 Water Supply</div>
            <div>🛣 Road Problems</div>
            <div>⚡ Electricity</div>
          </div>
        </div>

        <div className="how-it-works">
          <h2>How It Works</h2>

          <div className="steps">
            <div>1️⃣ Register Complaint</div>
            <div>2️⃣ Authority Reviews</div>
            <div>3️⃣ Issue Resolved</div>
          </div>
        </div>

        <div className="stats">
          <h2>Our Impact</h2>

          <div className="stats-box">
                  <div>
                    <h3>120+</h3>
                    <p>Complaints Solved</p>
                  </div>

                  <div>
                    <h3>50+</h3>
                    <p>Active Users</p>
                  </div>

                  <div>
                    <h3>95%</h3>
                    <p>Success Rate</p>
                  </div>
            </div>
        </div>





        {/* FOOTER */}

        <footer className="footer">

          <div className="footer-content">

            <div>
              <h3>Complaint Management System</h3>

              <p>
                Smart solution for managing municipal complaints.
              </p>
            </div>

            <div>
              <h4>Quick Links</h4>

              <p onClick={() => navigate("/")}>Home</p>

              <p onClick={() => navigate("/complaint")}>
                Raise Complaint
              </p>

              <p onClick={() => navigate("/login")}>
                Login
              </p>
            </div>

            <div>
              <h4>Contact</h4>

              <p>Email: support@cms.com</p>

              <p>Phone: +91 9876543210</p>

              <p>Pune, Maharashtra</p>
            </div>

          </div>

          <div className="footer-bottom">
            © 2026 Complaint Management System
          </div>

        </footer>
      </div>

    </>
  );
}

export default Home;