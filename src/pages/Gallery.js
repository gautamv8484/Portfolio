import React, { useState, useEffect } from "react";
import "../style.css";
import Navbar from "../components/Navbar";

function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Gallery data - replace with your actual data
  const galleryItems = [
    {
      id: 1,
      category: "project",
      title: "E-Commerce Website",
      shortDescription: "Full-stack shopping platform",
      fullDescription: "A complete e-commerce solution built from scratch with user authentication, product management, shopping cart, payment integration, and order tracking. Features include real-time inventory updates, wishlist functionality, and admin dashboard for managing products and orders.",
      images: [
        "/project1-img1.jpg",
        "/project1-img2.jpg",
        "/project1-img3.jpg",
        "/project1-img4.jpg"
      ],
      technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
      features: [
        "User Authentication & Authorization",
        "Product Search & Filtering",
        "Shopping Cart & Wishlist",
        "Payment Gateway Integration",
        "Order Tracking System",
        "Admin Dashboard"
      ],
      liveLink: "https://your-project-link.com",
      githubLink: "https://github.com/yourusername/project",
      date: "January 2025",
      duration: "3 months",
      role: "Full Stack Developer"
    },
    {
      id: 2,
      category: "project",
      title: "Portfolio Website",
      shortDescription: "Personal portfolio with animations",
      fullDescription: "A modern, responsive portfolio website showcasing my skills, projects, and achievements. Built with React and features smooth animations, dark theme, and interactive elements to create an engaging user experience.",
      images: [
        "/project2-img1.jpg",
        "/project2-img2.jpg",
        "/project2-img3.jpg"
      ],
      technologies: ["React", "CSS3", "JavaScript", "Framer Motion"],
      features: [
        "Responsive Design",
        "Smooth Animations",
        "Interactive UI",
        "Contact Form",
        "Project Showcase"
      ],
      liveLink: "https://your-portfolio.com",
      githubLink: "https://github.com/yourusername/portfolio",
      date: "December 2024",
      duration: "2 weeks",
      role: "Frontend Developer"
    },
    {
      id: 3,
      category: "project",
      title: "Task Management App",
      shortDescription: "Productivity app with drag & drop",
      fullDescription: "A comprehensive task management application with drag-and-drop functionality, team collaboration features, deadline reminders, and progress tracking. Helps teams stay organized and productive.",
      images: [
        "/project3-img1.jpg",
        "/project3-img2.jpg",
        "/project3-img3.jpg",
        "/project3-img4.jpg"
      ],
      technologies: ["React", "Redux", "Firebase", "Material-UI"],
      features: [
        "Drag & Drop Tasks",
        "Team Collaboration",
        "Deadline Reminders",
        "Progress Tracking",
        "Real-time Updates"
      ],
      liveLink: "https://task-app.com",
      githubLink: "https://github.com/yourusername/task-app",
      date: "November 2024",
      duration: "1 month",
      role: "Frontend Developer"
    },
    {
      id: 4,
      category: "personal",
      title: "My Journey",
      shortDescription: "Personal life moments",
      fullDescription: "A collection of memorable moments from my personal journey. These photos represent the experiences and adventures that have shaped who I am today.",
      images: [
        "/retouch_2025091813124944.jpg",
        "/1.jpg",
        "/personal-img3.jpg",
        "/personal-img4.jpg"
      ],
      technologies: [],
      features: [],
      liveLink: "",
      githubLink: "",
      date: "2024-2025",
      duration: "",
      role: ""
    },
    {
      id: 5,
      category: "personal",
      title: "Adventures",
      shortDescription: "Travel and exploration",
      fullDescription: "Capturing beautiful moments from my travels and adventures. Each photo tells a story of exploration, discovery, and the joy of experiencing new places.",
      images: [
        "/IMG_20250927_162313.png",
        "/retouch_2025112212470553.jpg",
        "/adventure-img3.jpg"
      ],
      technologies: [],
      features: [],
      liveLink: "",
      githubLink: "",
      date: "2024",
      duration: "",
      role: ""
    },
    {
      id: 6,
      category: "achievement",
      title: "Hackathon Winner",
      shortDescription: "1st Place - Tech Fest 2024",
      fullDescription: "Won first place in the annual Tech Fest Hackathon 2024. Our team built an innovative solution for sustainable urban transportation in just 24 hours. The project impressed judges with its creativity, technical implementation, and real-world applicability.",
      images: [
        "/achievement1-img1.jpg",
        "/achievement1-img2.jpg",
        "/achievement1-img3.jpg"
      ],
      technologies: ["Python", "TensorFlow", "React Native", "Google Maps API"],
      features: [
        "AI-powered route optimization",
        "Real-time traffic analysis",
        "Carbon footprint tracking",
        "Community carpooling"
      ],
      liveLink: "",
      githubLink: "https://github.com/yourusername/hackathon-project",
      date: "March 2024",
      duration: "24 hours",
      role: "Team Lead & Developer"
    },
    {
      id: 7,
      category: "achievement",
      title: "AWS Certification",
      shortDescription: "AWS Solutions Architect",
      fullDescription: "Successfully earned the AWS Certified Solutions Architect - Associate certification. This validates my expertise in designing distributed systems on AWS, implementing cost-effective solutions, and following best practices for cloud architecture.",
      images: [
        "/achievement2-img1.jpg",
        "/achievement2-img2.jpg"
      ],
      technologies: ["AWS EC2", "S3", "Lambda", "RDS", "CloudFormation"],
      features: [
        "Cloud Architecture Design",
        "Security Best Practices",
        "Cost Optimization",
        "High Availability Systems"
      ],
      liveLink: "https://aws.amazon.com/verification",
      githubLink: "",
      date: "February 2024",
      duration: "3 months preparation",
      role: "Cloud Practitioner"
    },
    {
      id: 8,
      category: "achievement",
      title: "Open Source Contributor",
      shortDescription: "Top contributor badge",
      fullDescription: "Recognized as a top contributor to several open-source projects. Made significant contributions including bug fixes, new features, and documentation improvements. Active member of the developer community.",
      images: [
        "/achievement3-img1.jpg",
        "/achievement3-img2.jpg",
        "/achievement3-img3.jpg"
      ],
      technologies: ["JavaScript", "TypeScript", "Python", "Go"],
      features: [
        "50+ Pull Requests Merged",
        "Bug Fixes & Features",
        "Documentation",
        "Code Reviews"
      ],
      liveLink: "https://github.com/yourusername",
      githubLink: "https://github.com/yourusername",
      date: "2023-2024",
      duration: "Ongoing",
      role: "Open Source Contributor"
    },
    {
      id: 9,
      category: "project",
      title: "Weather Dashboard",
      shortDescription: "Real-time weather application",
      fullDescription: "A beautiful weather dashboard that provides real-time weather information, 7-day forecasts, and weather alerts. Features include location-based weather, multiple city tracking, and interactive weather maps.",
      images: [
        "/project4-img1.jpg",
        "/project4-img2.jpg",
        "/project4-img3.jpg"
      ],
      technologies: ["React", "OpenWeather API", "Chart.js", "Geolocation API"],
      features: [
        "Real-time Weather Data",
        "7-Day Forecast",
        "Weather Alerts",
        "Interactive Maps",
        "Multiple Locations"
      ],
      liveLink: "https://weather-dashboard.com",
      githubLink: "https://github.com/yourusername/weather-app",
      date: "October 2024",
      duration: "2 weeks",
      role: "Frontend Developer"
    }
  ];

  const filteredItems = activeCategory === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const openModal = (item) => {
    setSelectedProject(item);
    setCurrentImageIndex(0);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedProject) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  return (
    <>
      <Navbar />

      {/* Gallery Section */}
      <section className="gallery-section">
        {/* Animated Background */}
        <div className="gallery-bg-shapes">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Header */}
        <div className="gallery-header">
          <span className="gallery-subtitle">My Work</span>
          <h1 className="gallery-title">Gallery</h1>
          <p className="gallery-description">
            A showcase of my journey, projects, and achievements
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="gallery-filters">
          <button
            className={`filter-btn ${activeCategory === "all" ? "active" : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            <i className="fas fa-th-large"></i>
            All
          </button>
          <button
            className={`filter-btn ${activeCategory === "personal" ? "active" : ""}`}
            onClick={() => setActiveCategory("personal")}
          >
            <i className="fas fa-user"></i>
            Personal
          </button>
          <button
            className={`filter-btn ${activeCategory === "project" ? "active" : ""}`}
            onClick={() => setActiveCategory("project")}
          >
            <i className="fas fa-code"></i>
            Projects
          </button>
          <button
            className={`filter-btn ${activeCategory === "achievement" ? "active" : ""}`}
            onClick={() => setActiveCategory("achievement")}
          >
            <i className="fas fa-trophy"></i>
            Achievements
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredItems.map((item, index) => (
            <div
              className="gallery-item"
              key={item.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="gallery-item-inner">
                <img src={item.images[0]} alt={item.title} />
                <div className="gallery-item-overlay">
                  <div className="overlay-content">
                    <span className="item-category">{item.category}</span>
                    <h3 className="item-title">{item.title}</h3>
                    <p className="item-description">{item.shortDescription}</p>
                    <button className="view-btn" onClick={() => openModal(item)}>
                      <i className="fas fa-expand"></i>
                      View Details
                    </button>
                  </div>
                </div>
                <div className="item-glow"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="gallery-stats">
          <div className="stat-item">
            <span className="stat-number">
              {galleryItems.filter(i => i.category === "project").length}+
            </span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {galleryItems.filter(i => i.category === "achievement").length}+
            </span>
            <span className="stat-label">Achievements</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {galleryItems.reduce((acc, item) => acc + item.images.length, 0)}+
            </span>
            <span className="stat-label">Photos</span>
          </div>
        </div>

        {/* Full Screen Project Modal */}
        {selectedProject && (
          <div className="project-modal-overlay" onClick={closeModal}>
            <div className="project-modal" onClick={(e) => e.stopPropagation()}>
              
              {/* Close Button */}
              <button className="modal-close-btn" onClick={closeModal}>
                <i className="fas fa-times"></i>
              </button>

              {/* Modal Content */}
              <div className="modal-content">
                
                {/* Left Side - Image Gallery */}
                <div className="modal-gallery">
                  <div className="main-image-container">
                    <img
                      src={selectedProject.images[currentImageIndex]}
                      alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                      className="main-image"
                    />
                    
                    {/* Image Navigation Arrows */}
                    {selectedProject.images.length > 1 && (
                      <>
                        <button className="img-nav-btn prev-btn" onClick={prevImage}>
                          <i className="fas fa-chevron-left"></i>
                        </button>
                        <button className="img-nav-btn next-btn" onClick={nextImage}>
                          <i className="fas fa-chevron-right"></i>
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    <div className="image-counter">
                      {currentImageIndex + 1} / {selectedProject.images.length}
                    </div>
                  </div>

                  {/* Thumbnail Strip */}
                  {selectedProject.images.length > 1 && (
                    <div className="thumbnail-strip">
                      {selectedProject.images.map((img, index) => (
                        <div
                          key={index}
                          className={`thumbnail ${index === currentImageIndex ? "active" : ""}`}
                          onClick={() => goToImage(index)}
                        >
                          <img src={img} alt={`Thumbnail ${index + 1}`} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Side - Project Details */}
                <div className="modal-details">
                  <div className="details-scroll">
                    
                    {/* Category Badge */}
                    <span className="modal-category">{selectedProject.category}</span>
                    
                    {/* Title */}
                    <h1 className="modal-title">{selectedProject.title}</h1>
                    
                    {/* Meta Info */}
                    <div className="modal-meta">
                      {selectedProject.date && (
                        <div className="meta-item">
                          <i className="fas fa-calendar-alt"></i>
                          <span>{selectedProject.date}</span>
                        </div>
                      )}
                      {selectedProject.duration && (
                        <div className="meta-item">
                          <i className="fas fa-clock"></i>
                          <span>{selectedProject.duration}</span>
                        </div>
                      )}
                      {selectedProject.role && (
                        <div className="meta-item">
                          <i className="fas fa-user-tag"></i>
                          <span>{selectedProject.role}</span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <div className="modal-section">
                      <h3><i className="fas fa-info-circle"></i> About</h3>
                      <p className="modal-description">{selectedProject.fullDescription}</p>
                    </div>

                    {/* Technologies */}
                    {selectedProject.technologies.length > 0 && (
                      <div className="modal-section">
                        <h3><i className="fas fa-code"></i> Technologies Used</h3>
                        <div className="tech-tags">
                          {selectedProject.technologies.map((tech, index) => (
                            <span key={index} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Features */}
                    {selectedProject.features.length > 0 && (
                      <div className="modal-section">
                        <h3><i className="fas fa-star"></i> Key Features</h3>
                        <ul className="features-list">
                          {selectedProject.features.map((feature, index) => (
                            <li key={index}>
                              <i className="fas fa-check-circle"></i>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Action Buttons */}
                    {(selectedProject.liveLink || selectedProject.githubLink) && (
                      <div className="modal-actions">
                        {selectedProject.liveLink && (
                          <a
                            href={selectedProject.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="action-btn live-btn"
                          >
                            <i className="fas fa-external-link-alt"></i>
                            Live Demo
                          </a>
                        )}
                        {selectedProject.githubLink && (
                          <a
                            href={selectedProject.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="action-btn github-btn"
                          >
                            <i className="fab fa-github"></i>
                            View Code
                          </a>
                        )}
                      </div>
                    )}

                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Gallery;