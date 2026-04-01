import React from "react";
import "../style.css";
import Navbar from "../components/Navbar";

function Resume() {
  return (
    <>
      <Navbar/>

      {/* Title */}
      <div style={{ marginLeft: "30px", color: "white" }}>
        <h2>📝 Resume</h2>
        <p style={{ marginLeft: "20px" }}>
          Quick summary below and full resume preview with download option.
        </p>
      </div>

      {/* Resume Summary */}
      <div className="resume-summary">

        {/* LEFT SECTION */}
        <div className="left">
          <h2 className="name">✨ Gautam Vyas</h2>
          <p className="role">Frontend Developer</p>
          <p className="location">📍 Surat, India</p>
          <p className="email">✉ gautamv8484@gmail.com</p>

          <h3 className="section-title">📘 Education</h3>
          <p className="edu-title">
            <strong>B.Tech in Information Technology</strong>
          </p>
          <p>Swarrnim Institute of Technology (2022–2026)</p>

          <h3 className="section-title">🏆 Achievements</h3>
          <ul className="list">
            <li>🏅 Finalist — College Hackathon 2024</li>
            <li>📄 Startup Project (In Review)</li>
          </ul>
        </div>

        {/* RIGHT SECTION */}
        <div className="right">
          <h3 className="section-title">📂 Projects & Experience</h3>

          <ul className="list">
            <li>
              <strong>BrickBazaar</strong><br />
              An online platform connecting brick buyers and sellers
            </li>

            <li>
              <strong>WashonWheels</strong><br />
              Developed a car wash booking system with service and time-slot features
            </li>
          </ul>

          <h3 className="section-title">⚙ Key Skills</h3>
          <div className="skills">
            <span>Python</span>
            <span>C</span>
            <span>C++</span>
            <span>React</span>
            <span>HTML</span>
            <span>CSS</span>
            <span>JavaScript</span>
            <span>Node.js</span>
            <span>MySQL</span>
          </div>
        </div>
      </div>

      {/* PDF Preview */}
      <div className="pdf">
        <iframe src="/RESUME_GAUTAM_VYAS.pdf" title="resume"></iframe>
      </div>

      {/* Download Button */}
      <div className="download-btn">
        <a href="/RESUME_GAUTAM_VYAS.pdf" download>
          ⬇ Download Resume
        </a>
      </div>
    </>
  );
}

export default Resume;