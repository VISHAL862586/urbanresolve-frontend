import Header from "../Header/Header";
import "./Contact.css";

function Contact() {

  return (
    <>
      <Header />

      <div className="contact-container">

        <h1 className="contact-title">
          Contact UrbanResolve
        </h1>

        <div className="contact-wrapper">

          {/* LEFT SIDE */}
          <div className="contact-info">

            <h2>Get In Touch</h2>

            <p>
              📍 <strong>Address:</strong><br />
              UrbanResolve Municipal Corporation,
              Solapur, Maharashtra
            </p>

            <p>
              📞 <strong>Phone:</strong><br />
              +91 9876543210
            </p>

            <p>
              ✉️ <strong>Email:</strong><br />
              support@urbanresolve.com
            </p>

            <p>
              🕒 <strong>Working Hours:</strong><br />
              Monday - Saturday<br />
              9:00 AM - 6:00 PM
            </p>

            <p>
              🚨 <strong>Emergency Helpline:</strong><br />
              1800-123-456
            </p>

          </div>

          {/* RIGHT SIDE */}
          <form className="contact-form">

            <input
              type="text"
              placeholder="Your Name"
              required
            />

            <input
              type="email"
              placeholder="Your Email"
              required
            />

            <input
              type="text"
              placeholder="Subject"
              required
            />

            <textarea
              rows="6"
              placeholder="Your Message"
              required
            ></textarea>

            <button>
              Send Message
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default Contact;