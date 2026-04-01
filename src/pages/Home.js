import React from "react";
import "../style.css";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="main">
      <Navbar />

      {/* Home Section */}
      <section className="home">
        <div className="profile-img">
          <img src="/profile_photo.jpeg" alt="profile" />
        </div>

        <div className="details">
          <span style={{ fontSize: "40px" }}>
            Hi, I'm <span style={{ color: "aqua" }}>Gautam Vyas</span>
          </span>

          <p>Fullstack Web Developer | Designer</p>

          <div className="Strength">
            <p>AI enthusiast</p>
            <p>IT Engineer</p>
            <p>Web Developer</p>
          </div>

          <div className="other-details">
            <div className="location">
              <p style={{ fontSize: "15px" }}>📍Location</p>
              <p>Surat, Gujarat</p>
            </div>

            <div className="location">
              <p style={{ fontSize: "15px" }}>🎯Expertise</p>
              <p>AI, Problem Solving</p>
            </div>

            <div className="location">
              <p style={{ fontSize: "15px" }}>📞Contacts</p>
              <p>gautamv8484@gmail.com</p>
            </div>
          </div>

          <div className="code">
            <span className="repeat"></span>
          </div>
        </div>
      </section>

      {/* Contact Icons */}
      <div className="Contact">
        <h2>Contacts</h2>
        <div className="icons">
          <div className="icons1">
            <a href="https://instagram.com/heyygauttam" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i>
            </a>

            <a href="https://facebook.com/Gautam Vyas" target="_blank" rel="noreferrer"> <i className="fa-brands fa-facebook"></i>
            </a>

            <a href="https://wa.me/9974837395" target="_blank" rel="noreferrer"><i className="fa-brands fa-whatsapp"></i>
            </a>

            <a href="https://linkedin.com/in/gautamv1312" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin"></i></a>

            <a href="mailto:gautamv8484@gmail.com"><i className="fa-regular fa-message"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
