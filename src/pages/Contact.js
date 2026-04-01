import React, { useState } from "react";
import "../style.css";
import Navbar from "../components/Navbar";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      alert("Message sent successfully!");
    } catch (error) {
      alert("Error sending message");
    }
  };

  return (
    <div className="main1">

      <Navbar/>

      {/* Content */}
      <div className="container">
        <span className="heading">
          <h1>Let's Connect & Collaborate 🩵</h1>
          <p>
            Whether it's a new project, collaboration, or just say hi — I'd love to hear from you.
          </p>
        </span>

        {/* Icons */}
        <div className="icons1">
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-whatsapp"></i>
          <i className="fa-brands fa-linkedin"></i>
          <i className="fa-regular fa-message"></i>
        </div>

        {/* Form */}
        <div className="msg">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            onChange={handleChange}
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Your Message"
            onChange={handleChange}
          ></textarea>

          <button onClick={handleSubmit}>🚀 Send Message</button>
        </div>
      </div>
    </div>
  );
}

export default Contact;