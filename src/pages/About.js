import React from "react";
import "../style.css";
import Navbar from "../components/Navbar";

function About() {
  return (
    <>
   <Navbar />

      {/* About Section */}
      <section className="about">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="About">
            <h2>About</h2>

            <p>
              Hi, I’m an Full stack Web Developer with a strong interest in
              creating clean, responsive, and visually appealing digital
              experiences. I enjoy transforming ideas into functional web
              interfaces using HTML, CSS, JavaScript,React,Node.js and modern design
              principles.
              <br /><br />
              I’m passionate about building websites that not only look beautiful
              but also provide smooth, intuitive user interactions.
              <br /><br />
              I constantly explore new design trends, animation techniques, and
              front-end tools to improve the quality of my work.
              <br /><br />
              Beyond coding, I enjoy experimenting with UI/UX, enhancing layouts,
              and blending creativity with technical precision. My goal is to
              develop meaningful digital experiences that deliver both performance
              and elegance.
              <br /><br />
              Currently, I'm working on multiple projects to strengthen my skills
              and build a strong portfolio. I’m also seeking opportunities where I
              can contribute, learn, and grow as a developer.
            </p>

            <br /><br />

            <h2>Education</h2>

            {/* Education 1 */}
            <div className="education">
              <div className="edu1">
                <p><i className="fa-solid fa-building-columns"></i></p>
              </div>
              <div className="edu2">
                <h3>B.Tech in Information Technology</h3>
                <span>Swarrnim Institute of Technology - Gandhinagar, Gujarat</span>
                <p>4th Year (Pursuing) | CGPA: 9.09</p>
                <p>2022 - 2026</p>
              </div>
            </div>

            {/* Education 2 */}
            <div className="education">
              <div className="edu1">
                <p><i className="fa-solid fa-graduation-cap"></i></p>
              </div>
              <div className="edu2">
                <h3>Higher Secondary Education (12th Grade)</h3>
                <span>B.H. Kalsariya Science Academy - Surat, Gujarat</span>
                <p>Gujarat Board | Percentage: 70%</p>
                <p>Completed in 2022</p>
              </div>
            </div>

            {/* Education 3 */}
            <div className="education">
              <div className="edu1">
                <p><i className="fa-solid fa-school"></i></p>
              </div>
              <div className="edu2">
                <h3>Secondary Education (10th Grade)</h3>
                <span>Suman High School No.2 - Surat, Gujarat</span>
                <p>Gujarat Board | Percentage: 86%</p>
                <p>Completed in 2020</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default About;