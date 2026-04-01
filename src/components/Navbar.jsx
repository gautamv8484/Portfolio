import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="main-header">
      <div className="logo-section">
        <p style={{ color: "aqua" }}>GV</p>
        <h2>Gautam Vyas</h2>
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/skills">Skills</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/resume">Resume</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
}

export default Navbar;