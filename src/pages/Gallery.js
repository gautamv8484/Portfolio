import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../style.css";
import Navbar from "../components/Navbar";

function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // YOUR ACTUAL PROJECTS DATA
  const galleryItems = [
    {
      id: 1,
      category: "project",
      title: "Digital Seva Platform",
      shortDescription: "Full-stack digital services platform",
      fullDescription: "Digital Seva is a full-stack web application designed to provide various digital services in a centralized platform. It allows users to access essential services efficiently with a clean and responsive interface. The system focuses on performance, scalability, and user experience. Built with modern technologies to ensure fast loading times and seamless user interactions across all devices.",
      images: [
        "/projects/digital-seva-1.png",
        "/projects/digital-seva-2.png",
        "/projects/digital-seva-3.png"
      ],
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "REST API"],
      features: [
        "User-friendly interface",
        "Responsive design (mobile + desktop)",
        "API-based backend system",
        "Scalable architecture",
        "Fast loading performance",
        "Secure data handling"
      ],
      liveLink: "https://digital-seva.vercel.app/",
      githubLink: "https://github.com/gautamv8484/Digital-Seva",
      date: "2024",
      duration: "2 months",
      role: "Full Stack Developer",
      status: "Live",
      highlights: ["MERN Stack", "Live Project", "Responsive"]
    },
    {
      id: 2,
      category: "project",
      title: "Hostel Management System",
      shortDescription: "Complete hostel administration solution",
      fullDescription: "A full-stack Hostel Management System built to manage room allocation, student records, and booking operations. It simplifies hostel administration by automating processes and reducing manual work. The system includes real-time room availability tracking, student management, and a comprehensive admin dashboard for complete control over hostel operations.",
      images: [
        "/projects/hostel-1.png",
        "/projects/hostel-2.png",
        "/projects/hostel-3.png",
        "/projects/hostel-4.png"
      ],
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Auth"],
      features: [
        "User authentication & authorization",
        "Room booking system",
        "Admin dashboard",
        "Real-time room availability",
        "RESTful API integration",
        "Student record management",
        "Booking history tracking"
      ],
      liveLink: "https://hostel-management-system-mern-stack-gmr4zvv62.vercel.app/",
      githubLink: "https://github.com/gautamv8484/Hostel-Management-System-MERN-STACK-",
      date: "2024",
      duration: "3 months",
      role: "Full Stack Developer",
      status: "Live",
      highlights: ["MERN Stack", "Authentication", "Dashboard"]
    },
    {
      id: 3,
      category: "project",
      title: "Portfolio Website",
      shortDescription: "Modern personal portfolio with animations",
      fullDescription: "A personal portfolio website showcasing my skills, projects, and experience as a Full Stack Developer. It highlights my work, technical expertise, and provides a platform for recruiters and clients to connect with me. Features include smooth animations, interactive elements, and a clean modern design that represents my professional identity.",
      images: [
        "/projects/portfolio-1.png",
        "/projects/portfolio-2.png",
        "/projects/portfolio-3.png"
      ],
      technologies: ["React.js", "Framer Motion", "GSAP", "CSS3", "Vercel"],
      features: [
        "Modern responsive UI",
        "Project showcase section",
        "Contact section with form",
        "Clean and interactive design",
        "Smooth scroll animations",
        "Dark theme interface"
      ],
      liveLink: "",
      githubLink: "https://github.com/gautamv8484/Portfolio",
      date: "2025",
      duration: "Ongoing",
      role: "Frontend Developer",
      status: "In Development",
      highlights: ["React", "Animations", "Modern UI"]
    },
    {
      id: 4,
      category: "achievement",
      title: "Hackathon Finalist",
      shortDescription: "College Hackathon 2024",
      fullDescription: "Achieved finalist position in the College Hackathon 2024. Demonstrated strong problem-solving skills, teamwork, and ability to build innovative solutions under time pressure. The experience enhanced my skills in rapid prototyping and collaborative development.",
      images: [
        "/achievements/hackathon.jpg",
        "/achievements/hackathon-2.jpg"
      ],
      technologies: ["Problem Solving", "Team Collaboration", "Rapid Development"],
      features: [
        "Built solution in limited time",
        "Team collaboration",
        "Innovative approach",
        "Technical presentation"
      ],
      liveLink: "",
      githubLink: "",
      date: "2024",
      duration: "24 hours",
      role: "Team Member",
      status: "Completed",
      highlights: ["Finalist", "Teamwork", "Innovation"]
    },
    {
      id: 5,
      category: "achievement",
      title: "Startup Project",
      shortDescription: "Entrepreneurial venture in review",
      fullDescription: "Currently working on an innovative startup project that aims to solve real-world problems through technology. The project is in the review phase and focuses on creating impactful solutions using modern web technologies and user-centered design principles.",
      images: [
        "/achievements/startup-1.jpg",
        "/achievements/startup-2.jpg"
      ],
      technologies: ["Business Development", "Product Design", "Full Stack Development"],
      features: [
        "Market research",
        "Product development",
        "Business planning",
        "Technical implementation"
      ],
      liveLink: "",
      githubLink: "",
      date: "2024-2025",
      duration: "Ongoing",
      role: "Founder & Developer",
      status: "In Review",
      highlights: ["Startup", "Innovation", "Entrepreneurship"]
    },
    {
      id: 6,
      category: "personal",
      title: "My Journey",
      shortDescription: "Personal life moments & memories",
      fullDescription: "A collection of memorable moments from my personal journey as a developer and individual. These photos represent the experiences, adventures, and milestones that have shaped who I am today. From learning to code to building real-world applications.",
      images: [
        "/personal/journey-1.jpg",
        "/personal/journey-2.jpg",
        "/personal/journey-3.jpg"
      ],
      technologies: [],
      features: [],
      liveLink: "",
      githubLink: "",
      date: "2022-2025",
      duration: "",
      role: "",
      status: "",
      highlights: ["Memories", "Growth", "Journey"]
    },
    {
      id: 7,
      category: "personal",
      title: "College Life",
      shortDescription: "B.Tech IT memories",
      fullDescription: "Capturing the best moments from my B.Tech journey at Swarrnim Institute of Technology. From coding sessions to project presentations, hackathons to friendships - these memories define my college experience as an IT student.",
      images: [
        "/personal/college-1.jpg",
        "/personal/college-2.jpg",
        "/personal/college-3.jpg"
      ],
      technologies: [],
      features: [],
      liveLink: "",
      githubLink: "",
      date: "2022-2026",
      duration: "",
      role: "Student",
      status: "",
      highlights: ["B.Tech", "IT", "Memories"]
    }
  ];

  const filteredItems = activeCategory === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const openModal = useCallback((item) => {
    setSelectedProject(item);
    setCurrentImageIndex(0);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = "auto";
  }, []);

  const nextImage = useCallback(() => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  }, [selectedProject]);

  const prevImage = useCallback(() => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  }, [selectedProject]);

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
  }, [selectedProject, closeModal, nextImage, prevImage]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Category counts
  const categoryCounts = {
    all: galleryItems.length,
    project: galleryItems.filter(i => i.category === "project").length,
    achievement: galleryItems.filter(i => i.category === "achievement").length,
    personal: galleryItems.filter(i => i.category === "personal").length
  };

  return (
    <>
      <Navbar />

      {/* Main Gallery Section */}
      <section className="gallery-page">
        
        {/* Animated Background */}
        <div className="gallery-background">
          <div className="bg-grid"></div>
          <div className="bg-glow bg-glow-1"></div>
          <div className="bg-glow bg-glow-2"></div>
          <div className="bg-glow bg-glow-3"></div>
          <div className="floating-code">
            <span>{"<code>"}</span>
            <span>{"{ }"}</span>
            <span>{"</>"}</span>
            <span>{"[ ]"}</span>
            <span>{"( )"}</span>
          </div>
        </div>

        {/* Hero Header */}
        <div className="gallery-hero">
          <motion.div 
            className="gallery-hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="gallery-badge">
              <i className="fas fa-folder-open"></i> My Work
            </span>
            <h1 className="gallery-main-title">
              Project <span className="highlight">Gallery</span>
            </h1>
            <p className="gallery-main-description">
              Explore my journey through code — from full-stack applications to 
              personal achievements. Each project represents a step forward in my 
              development career.
            </p>
            
            {/* Quick Stats */}
            <div className="gallery-quick-stats">
              <div className="quick-stat">
                <span className="stat-value">{categoryCounts.project}</span>
                <span className="stat-name">Projects</span>
              </div>
              <div className="stat-divider"></div>
              <div className="quick-stat">
                <span className="stat-value">{categoryCounts.achievement}</span>
                <span className="stat-name">Achievements</span>
              </div>
              <div className="stat-divider"></div>
              <div className="quick-stat">
                <span className="stat-value">3+</span>
                <span className="stat-name">Live Apps</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filter Section */}
        <motion.div 
          className="gallery-filter-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="filter-container">
            {[
              { key: "all", icon: "fa-layer-group", label: "All" },
              { key: "project", icon: "fa-code", label: "Projects" },
              { key: "achievement", icon: "fa-trophy", label: "Achievements" },
              { key: "personal", icon: "fa-user", label: "Personal" }
            ].map((filter) => (
              <motion.button
                key={filter.key}
                className={`filter-button ${activeCategory === filter.key ? "active" : ""}`}
                onClick={() => setActiveCategory(filter.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className={`fas ${filter.icon}`}></i>
                <span>{filter.label}</span>
                <span className="filter-count">{categoryCounts[filter.key]}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <div className="gallery-container">
          <AnimatePresence mode="wait">
            <motion.div 
              className="gallery-grid-new"
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  className={`gallery-card ${item.category}`}
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  onClick={() => openModal(item)}
                >
                  {/* Card Image */}
                  <div className="card-image">
                    <img src={item.images[0]} alt={item.title} />
                    <div className="card-overlay">
                      <motion.button 
                        className="view-project-btn"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <i className="fas fa-eye"></i>
                        View Details
                      </motion.button>
                    </div>
                    
                    {/* Status Badge */}
                    {item.status && (
                      <span className={`status-badge ${item.status.toLowerCase().replace(' ', '-')}`}>
                        {item.status}
                      </span>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="card-content">
                    <div className="card-category">
                      <i className={`fas fa-${item.category === 'project' ? 'code' : item.category === 'achievement' ? 'trophy' : 'user'}`}></i>
                      {item.category}
                    </div>
                    
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-description">{item.shortDescription}</p>
                    
                    {/* Highlights */}
                    {item.highlights && item.highlights.length > 0 && (
                      <div className="card-highlights">
                        {item.highlights.map((highlight, idx) => (
                          <span key={idx} className="highlight-tag">{highlight}</span>
                        ))}
                      </div>
                    )}

                    {/* Tech Stack Preview */}
                    {item.technologies.length > 0 && (
                      <div className="card-tech">
                        {item.technologies.slice(0, 3).map((tech, idx) => (
                          <span key={idx} className="tech-pill">{tech}</span>
                        ))}
                        {item.technologies.length > 3 && (
                          <span className="tech-more">+{item.technologies.length - 3}</span>
                        )}
                      </div>
                    )}

                    {/* Card Footer */}
                    <div className="card-footer">
                      <span className="card-date">
                        <i className="fas fa-calendar-alt"></i>
                        {item.date}
                      </span>
                      <div className="card-links">
                        {item.liveLink && (
                          <a 
                            href={item.liveLink} 
                            target="_blank" 
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="card-link live"
                          >
                            <i className="fas fa-external-link-alt"></i>
                          </a>
                        )}
                        {item.githubLink && (
                          <a 
                            href={item.githubLink} 
                            target="_blank" 
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="card-link github"
                          >
                            <i className="fab fa-github"></i>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Glow Effect */}
                  <div className="card-glow"></div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Featured Projects Section */}
        <div className="featured-section">
          <div className="featured-header">
            <h2><i className="fas fa-star"></i> Featured Projects</h2>
            <p>My top projects showcasing full-stack development skills</p>
          </div>
          
          <div className="featured-grid">
            {galleryItems.filter(item => item.category === "project" && item.liveLink).map((project) => (
              <motion.div 
                key={project.id}
                className="featured-card"
                whileHover={{ scale: 1.02 }}
              >
                <div className="featured-image">
                  <img src={project.images[0]} alt={project.title} />
                  <div className="featured-overlay">
                    <a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noreferrer"
                      className="featured-live-btn"
                    >
                      <i className="fas fa-rocket"></i> Visit Live
                    </a>
                  </div>
                </div>
                <div className="featured-content">
                  <h3>{project.title}</h3>
                  <p>{project.shortDescription}</p>
                  <div className="featured-tech">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <span key={idx}>{tech}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div 
          className="gallery-stats-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-code"></i>
              </div>
              <div className="stat-info">
                <span className="stat-number">{categoryCounts.project}+</span>
                <span className="stat-label">Projects Built</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-globe"></i>
              </div>
              <div className="stat-info">
                <span className="stat-number">2+</span>
                <span className="stat-label">Live Applications</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fab fa-github"></i>
              </div>
              <div className="stat-info">
                <span className="stat-number">10+</span>
                <span className="stat-label">GitHub Repos</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-trophy"></i>
              </div>
              <div className="stat-info">
                <span className="stat-number">{categoryCounts.achievement}+</span>
                <span className="stat-label">Achievements</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <div className="gallery-cta">
          <h2>Interested in working together?</h2>
          <p>I'm always open to discussing new projects and opportunities.</p>
          <div className="cta-buttons">
            <motion.a 
              href="/#contact" 
              className="cta-btn primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-paper-plane"></i> Get In Touch
            </motion.a>
            <motion.a 
              href="https://github.com/gautamv8484" 
              target="_blank"
              rel="noreferrer"
              className="cta-btn secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fab fa-github"></i> View GitHub
            </motion.a>
          </div>
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              className="project-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div 
                className="project-modal"
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button className="modal-close-btn" onClick={closeModal}>
                  <i className="fas fa-times"></i>
                </button>

                {/* Modal Content */}
                <div className="modal-content">
                  
                  {/* Left - Image Gallery */}
                  <div className="modal-gallery">
                    <div className="main-image-container">
                      <motion.img
                        key={currentImageIndex}
                        src={selectedProject.images[currentImageIndex]}
                        alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                        className="main-image"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Image Navigation */}
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
                        <i className="fas fa-images"></i>
                        {currentImageIndex + 1} / {selectedProject.images.length}
                      </div>
                    </div>

                    {/* Thumbnails */}
                    {selectedProject.images.length > 1 && (
                      <div className="thumbnail-strip">
                        {selectedProject.images.map((img, index) => (
                          <motion.div
                            key={index}
                            className={`thumbnail ${index === currentImageIndex ? "active" : ""}`}
                            onClick={() => setCurrentImageIndex(index)}
                            whileHover={{ scale: 1.1 }}
                          >
                            <img src={img} alt={`Thumbnail ${index + 1}`} />
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right - Project Details */}
                  <div className="modal-details">
                    <div className="details-scroll">
                      
                      {/* Header */}
                      <div className="modal-header">
                        <span className="modal-category">
                          <i className={`fas fa-${selectedProject.category === 'project' ? 'code' : selectedProject.category === 'achievement' ? 'trophy' : 'user'}`}></i>
                          {selectedProject.category}
                        </span>
                        {selectedProject.status && (
                          <span className={`modal-status ${selectedProject.status.toLowerCase().replace(' ', '-')}`}>
                            {selectedProject.status}
                          </span>
                        )}
                      </div>
                      
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
                          <h3><i className="fas fa-tools"></i> Tech Stack</h3>
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
                            <motion.a
                              href={selectedProject.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="action-btn live-btn"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <i className="fas fa-rocket"></i>
                              View Live
                            </motion.a>
                          )}
                          {selectedProject.githubLink && (
                            <motion.a
                              href={selectedProject.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="action-btn github-btn"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <i className="fab fa-github"></i>
                              View Code
                            </motion.a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}

export default Gallery;