import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../style.css";
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect on navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section based on scroll position
      const sections = ["home", "about", "skills", "gallery", "resume", "contact"];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Gallery", id: "gallery" },
    { name: "Resume", id: "resume" },
    { name: "Contact", id: "contact" },
  ];

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    // If not on home page, navigate to home first then scroll
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    // Close mobile menu
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`main-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        {/* Logo */}
        <div 
          className="logo-section"
          onClick={() => scrollToSection("home")}
          style={{ cursor: "pointer" }}
        >
          <div className="logo-circle">
            <span>GV</span>
          </div>
          <h2>Gautam Vyas</h2>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-links">
          {navItems.map((item, index) => (
            <a
              key={item.name}
              href={`#${item.id}`}
              className={`nav-link ${activeSection === item.id ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
            >
              <span className="nav-number">0{index + 1}.</span>
              {item.name}
              <span className="nav-underline"></span>
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className={`mobile-menu-toggle ${isMobileMenuOpen ? "open" : ""}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="mobile-menu"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          {navItems.map((item, index) => (
            <a
              key={item.name}
              href={`#${item.id}`}
              className={`mobile-nav-link ${activeSection === item.id ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
            >
              <span className="nav-number">0{index + 1}.</span>
              {item.name}
            </a>
          ))}
        </motion.div>
      )}

      {/* Decorative Line */}
      <div className="nav-glow"></div>
    </header>
  );
}

export default Navbar;