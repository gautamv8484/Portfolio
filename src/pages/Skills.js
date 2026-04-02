import React from "react";
import "../style.css";
import Navbar from "../components/Navbar";

function Skills() {
  return (
    <>
      <Navbar/>

      {/* Skill Icons */}
      <div className="skills-container">
        <div className="bubble"><img src="/ai.png" alt="AI" /></div>
        <div className="bubble"><img src="/icons8-python-94.png" alt="Python" /></div>
        <div className="bubble"><img src="/c++.png" alt="C++" /></div>
        <div className="bubble"><img src="/html.png" alt="HTML" /></div>
        <div className="bubble"><img src="/css.png" alt="CSS" /></div>
        <div className="bubble"><img src="/java-script.png" alt="JavaScript" /></div>
        <div className="bubble"><img src="/logo512.png" alt="react" /></div>
        <div className="bubble"><img src="/node.png" alt="node" /></div>
        <div className="bubble"><img src="/icons8-python-94.png" alt="" /></div>
      </div>

      {/* Skills List */}
      <div className="skill">
        <div className="skill1">
          <h2>Programming Language</h2>
          <ul>
            <li>Python</li>
            <li>C</li>
            <li>C++</li>
          </ul>
        </div>

        <div className="skill1">
          <h2>Web Technologies</h2>
          <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>React</li>
            <li>Node.js</li>
          </ul>
        </div>

        <div className="skill1">
          <h2>Databases & Tools</h2>
          <ul>
            <li>MySQL</li>
            <li>MongoDB</li>
          </ul>
        </div>

        <div className="skill1">
          <h2>Core Concepts</h2>
          <ul>
            <li>Operating System</li>
            <li>Data Structures & Algorithms</li>
            <li>Database and Management System</li>
          </ul>
        </div>
      </div>

      {/* Soft Skills */}
      <div className="skill">
        <div
          className="skill1">
          <h2>Soft Skills</h2>
          <ul>
            <li>Teamwork</li>
            <li>Problem Solving</li>
            <li>Leadership</li>
            <li>Time Management</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Skills;