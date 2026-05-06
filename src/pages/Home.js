import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import "../style.css";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // Mouse tracking for interactive effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Canvas particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleCanvasMouseMove = (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };
    window.addEventListener('mousemove', handleCanvasMouseMove);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `hsl(${180 + Math.random() * 60}, 100%, ${50 + Math.random() * 30}%)`;
        this.originalX = this.x;
        this.originalY = this.y;
        this.density = Math.random() * 30 + 1;
      }

      update() {
        // Mouse interaction
        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let maxDistance = mouse.radius;
          let force = (maxDistance - distance) / maxDistance;
          let directionX = forceDirectionX * force * this.density;
          let directionY = forceDirectionY * force * this.density;

          if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
          } else {
            if (this.x !== this.originalX) {
              let dx = this.x - this.originalX;
              this.x -= dx / 20;
            }
            if (this.y !== this.originalY) {
              let dy = this.y - this.originalY;
              this.y -= dy / 20;
            }
          }
        }

        // Normal movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Boundary check
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const numberOfParticles = (canvas.width * canvas.height) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let distance = Math.sqrt(
            (particles[a].x - particles[b].x) ** 2 +
            (particles[a].y - particles[b].y) ** 2
          );
          if (distance < 120) {
            let opacity = 1 - distance / 120;
            ctx.strokeStyle = `rgba(0, 255, 255, ${opacity * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      connectParticles();
      
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleCanvasMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // GALLERY ITEMS DATA
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
      "/projects/digital-seva-2.jpg",
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
    status: "Live"
  },
  {
    id: 2,
    category: "project",
    title: "Hostel Management System",
    shortDescription: "Complete hostel administration solution",
    fullDescription: "A full-stack Hostel Management System built to manage room allocation, student records, and booking operations. It simplifies hostel administration by automating processes and reducing manual work. The system includes real-time room availability tracking, student management, and a comprehensive admin dashboard for complete control over hostel operations.",
    images: [
      "/projects/hostel1.png",
      "/projects/hostel2.png",
      "/projects/hostel3.png"
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Auth"],
    features: [
      "User authentication & authorization",
      "Room booking system",
      "Admin dashboard",
      "Real-time room availability",
      "RESTful API integration",
      "Student record management"
    ],
    liveLink: "https://hostel-management-system-mern-stack-gmr4zvv62.vercel.app/",
    githubLink: "https://github.com/gautamv8484/Hostel-Management-System-MERN-STACK-",
    date: "2024",
    duration: "3 months",
    role: "Full Stack Developer",
    status: "Live"
  },
  {
    id: 3,
    category: "project",
    title: "Portfolio Website",
    shortDescription: "Modern personal portfolio with animations",
    fullDescription: "A personal portfolio website showcasing my skills, projects, and experience as a Full Stack Developer. It highlights my work, technical expertise, and provides a platform for recruiters and clients to connect with me. Features include smooth animations, interactive elements, and a clean modern design.",
    images: [
      "/projects/portfolio1.png",
      "/projects/portfolio-2.png",
      "/projects/portfolio-3.png"
    ],
    technologies: ["React.js", "Framer Motion", "GSAP", "CSS3", "Vercel"],
    features: [
      "Modern responsive UI",
      "Project showcase section",
      "Contact section with form",
      "Smooth scroll animations",
      "Dark theme interface"
    ],
    liveLink: "https://portfolio-1312.vercel.app/",
    githubLink: "https://github.com/gautamv8484/Portfolio",
    date: "2025",
    duration: "Ongoing",
    role: "Frontend Developer",
    status: "Live"
  },
  
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

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData();
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE");
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("subject", form.subject);
    formData.append("message", form.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();

      if (data.success) {
        setSubmitStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(".hero-title", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power4.out" })
      .fromTo(".hero-role", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5")
      .fromTo(".Strength", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3");

    const sections = document.querySelectorAll(".section-animate");
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

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

  return (
    <div className="main">
      <Navbar />

      {/* ULTIMATE COSMIC BACKGROUND */}
      <div className="hero-background">
        {/* Animated Gradient Mesh */}
        <div className="gradient-mesh"></div>
        
        {/* Interactive Canvas Particles */}
        <canvas ref={canvasRef} className="particle-canvas"></canvas>
        
        {/* Floating Orbs */}
        <div className="cosmic-orbs">
          <div 
            className="orb orb-1"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
            }}
          ></div>
          <div 
            className="orb orb-2"
            style={{
              transform: `translate(${-mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`
            }}
          ></div>
          <div 
            className="orb orb-3"
            style={{
              transform: `translate(${mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`
            }}
          ></div>
          <div 
            className="orb orb-4"
            style={{
              transform: `translate(${-mousePosition.x * 0.02}px, ${-mousePosition.y * 0.02}px)`
            }}
          ></div>
        </div>

        {/* Glowing Lines */}
        <div className="glow-lines">
          <div className="glow-line"></div>
          <div className="glow-line"></div>
          <div className="glow-line"></div>
        </div>

        {/* Floating Shapes */}
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>

        {/* Noise Overlay */}
        <div className="noise-overlay"></div>

        {/* Radial Glow */}
        <div 
          className="mouse-glow"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`
          }}
        ></div>

        {/* Scan Lines */}
        <div className="scan-lines"></div>

        {/* Vignette */}
        <div className="vignette"></div>
      </div>

      <section id="home" className="home hero-section">
        <div className="home-content">
          <motion.div
            className="profile-img"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="profile-image-wrapper">
              <img src="/img1.png" alt="Gautam Vyas" />
              <div className="profile-ring"></div>
              <div className="profile-ring ring-2"></div>
              <div className="profile-glow"></div>
            </div>
          </motion.div>

          <div className="details">
            <motion.div
              className="hero-greeting"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="greeting-line"></span>
              <span className="greeting-text">Hello, I'm</span>
            </motion.div>

            <h1 className="hero-title">
              <span className="title-name">
                Gautam <span className="highlight">Vyas</span>
              </span>
            </h1>

            <p className="hero-role">Full Stack Developer | Designer</p>

            <div className="Strength">
              <motion.div className="strength-tag" whileHover={{ scale: 1.05, y: -5 }}>
                <i className="fas fa-brain"></i> AI Enthusiast
              </motion.div>
              <motion.div className="strength-tag" whileHover={{ scale: 1.05, y: -5 }}>
                <i className="fas fa-laptop-code"></i> IT Engineer
              </motion.div>
              <motion.div className="strength-tag" whileHover={{ scale: 1.05, y: -5 }}>
                <i className="fas fa-code"></i> Web Developer
              </motion.div>
            </div>

            <div className="other-details">
              <motion.div className="detail-card" whileHover={{ scale: 1.02, y: -3 }}>
                <div className="detail-icon">📍</div>
                <div className="detail-info">
                  <p className="detail-label">Location</p>
                  <p className="detail-value">Gandhinagar, Gujarat</p>
                </div>
              </motion.div>

              <motion.div className="detail-card" whileHover={{ scale: 1.02, y: -3 }}>
                <div className="detail-icon">🎯</div>
                <div className="detail-info">
                  <p className="detail-label">Expertise</p>
                  <p className="detail-value">Leadership,Real world problem solving</p>
                </div>
              </motion.div>

              <motion.div className="detail-card" whileHover={{ scale: 1.02, y: -3 }}>
                <div className="detail-icon">📧</div>
                <div className="detail-info">
                  <p className="detail-label">Contact</p>
                  <p className="detail-value">gautamv8484@gmail.com</p>
                </div>
              </motion.div>
            </div>

            <div className="hero-cta-container">
              <motion.a
                href="#gallery"
                className="hero-cta primary"
                whileHover={{ scale: 1.05, y: -3 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span>View My Work</span>
                <i className="fas fa-arrow-right"></i>
              </motion.a>

              <motion.a
                href="#contact"
                className="hero-cta secondary"
                whileHover={{ scale: 1.05, y: -3 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span>Get In Touch</span>
              </motion.a>
            </div>
          </div>
        </div>

        <div className="hero-gradient-overlay"></div>
      </section>

      <section id="about" className="about-section section-animate">
        <div className="section-container">
          <div className="section-header">
            <span className="section-number"></span>
            <h2 className="section-title">About </h2>
            <div className="section-line"></div>
          </div>

          <div className="about-content-wrapper">
            <div className="About">
              <p>
                Hi, I'm a Full Stack Web Developer with a strong interest in
                creating clean, responsive, and visually appealing digital
                experiences. I enjoy transforming ideas into functional web
                interfaces using HTML, CSS, JavaScript, React, Node.js and modern design
                principles.
                <br /><br />
                I'm passionate about building websites that not only look beautiful
                but also provide smooth, intuitive user interactions. I constantly 
                explore new design trends, animation techniques, and front-end tools 
                to improve the quality of my work.
                <br /><br />
                Currently, I'm working on multiple projects to strengthen my skills
                and build a strong portfolio. I'm also seeking opportunities where I
                can contribute, learn, and grow as a developer.
              </p>

              <h3 className="about-subtitle">Education</h3>

              <motion.div className="education" whileHover={{ x: 10 }}>
                <div className="edu1">
                  <i className="fa-solid fa-building-columns"></i>
                </div>
                <div className="edu2">
                  <h4>B.Tech in Information Technology</h4>
                  <span>Swarrnim Institute of Technology - Gandhinagar, Gujarat</span>
                  <p>4th Year (Pursuing) | CGPA: 9.09</p>
                  <p className="edu-year">2022 - 2026</p>
                </div>
              </motion.div>

              <motion.div className="education" whileHover={{ x: 10 }}>
                <div className="edu1">
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <div className="edu2">
                  <h4>Higher Secondary Education (12th Grade)</h4>
                  <span>B.H. Kalsariya Science Academy - Surat, Gujarat</span>
                  <p>Gujarat Board | Percentage: 70%</p>
                  <p className="edu-year">Completed in 2022</p>
                </div>
              </motion.div>

              <motion.div className="education" whileHover={{ x: 10 }}>
                <div className="edu1">
                  <i className="fa-solid fa-school"></i>
                </div>
                <div className="edu2">
                  <h4>Secondary Education (10th Grade)</h4>
                  <span>Suman High School No.2 - Surat, Gujarat</span>
                  <p>Gujarat Board | Percentage: 86%</p>
                  <p className="edu-year">Completed in 2020</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="skills-section section-animate">
        <div className="section-container">
          <div className="section-header">
            
            <h2 className="section-title">My Skills</h2>
            <div className="section-line"></div>
          </div>

          <div className="skills-bubbles">
            <motion.div className="bubble" whileHover={{ scale: 1.2 }}>
              <img src="/ai.png" alt="AI" />
            </motion.div>
            <motion.div className="bubble" whileHover={{ scale: 1.2 }}>
              <img src="/icons8-python-94.png" alt="Python" />
            </motion.div>
            <motion.div className="bubble" whileHover={{ scale: 1.2 }}>
              <img src="/c++.png" alt="C++" />
            </motion.div>
            <motion.div className="bubble" whileHover={{ scale: 1.2 }}>
              <img src="/html.png" alt="HTML" />
            </motion.div>
            <motion.div className="bubble" whileHover={{ scale: 1.2 }}>
              <img src="/css.png" alt="CSS" />
            </motion.div>
            <motion.div className="bubble" whileHover={{ scale: 1.2 }}>
              <img src="/java-script.png" alt="JavaScript" />
            </motion.div>
            <motion.div className="bubble" whileHover={{ scale: 1.2 }}>
              <img src="/logo512.png" alt="React" />
            </motion.div>
            <motion.div className="bubble" whileHover={{ scale: 1.2 }}>
              <img src="/node.png" alt="Node.js" />
            </motion.div>
          </div>

          <div className="skill-categories">
            <motion.div className="skill-card" whileHover={{ y: -5 }}>
              <h3><i className="fas fa-laptop-code"></i> Programming Languages</h3>
              <ul>
                <li>Python</li>
                <li>C</li>
                <li>C++</li>
              </ul>
            </motion.div>

            <motion.div className="skill-card" whileHover={{ y: -5 }}>
              <h3><i className="fas fa-globe"></i> Web Technologies</h3>
              <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>React</li>
                <li>Node.js</li>
              </ul>
            </motion.div>

            <motion.div className="skill-card" whileHover={{ y: -5 }}>
              <h3><i className="fas fa-database"></i> Databases & Tools</h3>
              <ul>
                <li>MySQL</li>
                <li>MongoDB</li>
                <li>Git & GitHub</li>
              </ul>
            </motion.div>

            <motion.div className="skill-card" whileHover={{ y: -5 }}>
              <h3><i className="fas fa-brain"></i> Core Concepts</h3>
              <ul>
                <li>Operating System</li>
                <li>Data Structures & Algorithms</li>
                <li>DBMS</li>
              </ul>
            </motion.div>

            <motion.div className="skill-card" whileHover={{ y: -5 }}>
              <h3><i className="fas fa-users"></i> Soft Skills</h3>
              <ul>
                <li>Teamwork</li>
                <li>Problem Solving</li>
                <li>Leadership</li>
                <li>Time Management</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================
    SECTION 4: GALLERY / PROJECTS
    ============================================ */}
<section id="gallery" className="gallery-section section-animate">
  <div className="gallery-bg-shapes">
    <span></span><span></span><span></span><span></span><span></span>
  </div>

  <div className="section-container">
    <div className="section-header center">
      <span className="section-number"></span>
      <h2 className="section-title">My Projects</h2>
      <div className="section-line center"></div>
    </div>

    <p className="section-description">
      Explore my journey through code — from full-stack applications to personal achievements
    </p>

    {/* Quick Stats */}
    <div className="gallery-quick-stats">
      <div className="quick-stat">
        <span className="stat-value">10+</span>
        <span className="stat-name">Projects</span>
      </div>
      <div className="quick-stat">
        <span className="stat-value">2+</span>
        <span className="stat-name">Live Apps</span>
      </div>
      <div className="quick-stat">
        <span className="stat-value">5+</span>
        <span className="stat-name">Achievements</span>
      </div>
    </div>

    {/* Filter Buttons */}
    <div className="gallery-filters">
      {["all", "project", "achievement", "personal"].map((cat) => (
        <button
          key={cat}
          className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
          onClick={() => setActiveCategory(cat)}
        >
          <i className={`fas fa-${
            cat === "all" ? "layer-group" : 
            cat === "project" ? "code" : 
            cat === "achievement" ? "trophy" : "user"
          }`}></i>
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
          <span className="filter-count">
            {cat === "all" 
              ? galleryItems.length 
              : galleryItems.filter(item => item.category === cat).length
            }
          </span>
        </button>
      ))}
    </div>

    {/* Gallery Grid */}
    <div className="gallery-grid">
      {filteredItems.map((item, index) => (
        <motion.div
          className="gallery-item"
          key={item.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -10 }}
          onClick={() => openModal(item)}
        >
          <div className="gallery-item-inner">
            <img src={item.images[0]} alt={item.title} />
            
            {/* Status Badge */}
            {item.status && (
              <span className={`status-badge ${item.status.toLowerCase().replace(' ', '-')}`}>
                {item.status}
              </span>
            )}

            <div className="gallery-item-overlay">
              <div className="overlay-content">
                <span className="item-category">
                  <i className={`fas fa-${
                    item.category === 'project' ? 'code' : 
                    item.category === 'achievement' ? 'trophy' : 'user'
                  }`}></i>
                  {item.category}
                </span>
                <h3 className="item-title">{item.title}</h3>
                <p className="item-description">{item.shortDescription}</p>
                
                {/* Tech Preview */}
                {item.technologies && item.technologies.length > 0 && (
                  <div className="item-tech-preview">
                    {item.technologies.slice(0, 3).map((tech, idx) => (
                      <span key={idx}>{tech}</span>
                    ))}
                    {item.technologies.length > 3 && (
                      <span>+{item.technologies.length - 3}</span>
                    )}
                  </div>
                )}

                <button className="view-btn">
                  <i className="fas fa-expand"></i> View Details
                </button>
              </div>
            </div>
            <div className="item-glow"></div>
          </div>

          {/* Quick Links */}
          <div className="item-quick-links">
            {item.liveLink && (
              <a 
                href={item.liveLink} 
                target="_blank" 
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="quick-link live"
                title="View Live"
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
                className="quick-link github"
                title="View Code"
              >
                <i className="fab fa-github"></i>
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </div>

    {/* View More Button */}
    <div className="gallery-view-more">
      <motion.a
        href="https://github.com/gautamv8484"
        target="_blank"
        rel="noreferrer"
        className="view-more-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <i className="fab fa-github"></i>
        View More on GitHub
      </motion.a>
    </div>
  </div>

  {/* Project Modal */}
  {selectedProject && (
    <div className="project-modal-overlay" onClick={closeModal}>
      <motion.div 
        className="project-modal" 
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <button className="modal-close-btn" onClick={closeModal}>
          <i className="fas fa-times"></i>
        </button>

        <div className="modal-content">
          <div className="modal-gallery">
            <div className="main-image-container">
              <img
                src={selectedProject.images[currentImageIndex]}
                alt={selectedProject.title}
                className="main-image"
              />
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
              <div className="image-counter">
                {currentImageIndex + 1} / {selectedProject.images.length}
              </div>
            </div>

            {selectedProject.images.length > 1 && (
              <div className="thumbnail-strip">
                {selectedProject.images.map((img, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${index === currentImageIndex ? "active" : ""}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="modal-details">
            <div className="details-scroll">
              {/* Header with Category & Status */}
              <div className="modal-header">
                <span className="modal-category">
                  <i className={`fas fa-${
                    selectedProject.category === 'project' ? 'code' : 
                    selectedProject.category === 'achievement' ? 'trophy' : 'user'
                  }`}></i>
                  {selectedProject.category}
                </span>
                {selectedProject.status && (
                  <span className={`modal-status ${selectedProject.status.toLowerCase().replace(' ', '-')}`}>
                    {selectedProject.status}
                  </span>
                )}
              </div>

              <h1 className="modal-title">{selectedProject.title}</h1>

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

              <div className="modal-section">
                <h3><i className="fas fa-info-circle"></i> About</h3>
                <p className="modal-description">{selectedProject.fullDescription}</p>
              </div>

              {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                <div className="modal-section">
                  <h3><i className="fas fa-tools"></i> Tech Stack</h3>
                  <div className="tech-tags">
                    {selectedProject.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              )}

              {selectedProject.features && selectedProject.features.length > 0 && (
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

              {(selectedProject.liveLink || selectedProject.githubLink) && (
                <div className="modal-actions">
                  {selectedProject.liveLink && (
                    <a href={selectedProject.liveLink} target="_blank" rel="noreferrer" className="action-btn live-btn">
                      <i className="fas fa-rocket"></i> View Live
                    </a>
                  )}
                  {selectedProject.githubLink && (
                    <a href={selectedProject.githubLink} target="_blank" rel="noreferrer" className="action-btn github-btn">
                      <i className="fab fa-github"></i> View Code
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )}
</section>

      <section id="resume" className="resume-section section-animate">
        <div className="section-container">
          <div className="section-header center">
            <span className="section-number"></span>
            <h2 className="section-title">Resume</h2>
            <div className="section-line center"></div>
          </div>

          <div className="resume-summary">
            <div className="left">
              <h2 className="name">✨ Gautam Vyas</h2>
              <p className="role">Full Stack Developer</p>
              <p className="location">📍 Gandhinagar, India</p>
              <p className="email">✉ gautamv8484@gmail.com</p>

              <h3 className="section-title">📘 Education</h3>
              <p className="edu-title"><strong>B.Tech in Information Technology</strong></p>
              <p>Swarrnim Institute of Technology (2022–2026)</p>

              <h3 className="section-title">🏆 Achievements</h3>
              <ul className="list">
                <li>🏅 Finalist — College Hackathon 2024</li>
                <li>📄 Startup Project (In Review)</li>
              </ul>
            </div>

            <div className="right">
              <h3 className="section-title">📂 Projects & Experience</h3>
              <ul className="list">
                <li>
                  <strong>BrickBazaar</strong><br />
                  Online platform connecting brick buyers and sellers
                </li>
                <li>
                  <strong>WashonWheels</strong><br />
                  Car wash booking system with service features
                </li>
              </ul>

              <h3 className="section-title">⚙ Key Skills</h3>
              <div className="skills">
                {["Python", "C", "C++", "React", "HTML", "CSS", "JavaScript", "Node.js", "MySQL"].map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="pdf">
            <iframe src="/RESUME_GAUTAM_VYAS.pdf" title="resume"></iframe>
          </div>

          <div className="download-btn">
            <a href="/RESUME_GAUTAM_VYAS.pdf" download>⬇ Download Resume</a>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section section-animate">
        <div className="section-container">
          <div className="section-header center">
            <span className="section-number"></span>
            <h2 className="section-title">Get In Touch</h2>
            <div className="section-line center"></div>
          </div>

          <p className="section-description">
            Whether it's a new project, collaboration, or just say hi — I'd love to hear from you.
          </p>

          <div className="contact-socials">
            {[
              { icon: "fa-instagram", link: "https://instagram.com/heyygauttam" },
              { icon: "fa-facebook", link: "https://facebook.com/Gautam Vyas" },
              { icon: "fa-whatsapp", link: "https://wa.me/9974837395" },
              { icon: "fa-linkedin", link: "https://linkedin.com/in/gautamv1312" },
              { icon: "fa-github", link: "https://github.com/gautamv8484" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
              >
                <i className={`fa-brands ${social.icon}`}></i>
              </motion.a>
            ))}
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email *"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <input
                type="text"
                name="subject"
                placeholder="Subject *"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message *"
                value={form.message}
                onChange={handleChange}
                rows="6"
                required
              ></textarea>
            </div>

            <motion.button
              type="submit"
              className={`submit-btn ${isSubmitting ? "submitting" : ""}`}
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <><span className="spinner"></span> Sending...</>
              ) : (
                <>🚀 Send Message</>
              )}
            </motion.button>

            {submitStatus === "success" && (
              <div className="submit-success">
                <i className="fas fa-check-circle"></i>
                Message sent successfully! I'll get back to you soon.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="submit-error">
                <i className="fas fa-exclamation-circle"></i>
                Oops! Something went wrong. Please try again.
              </div>
            )}
          </form>

          <div className="contact-info-cards">
            <div className="info-card">
              <div className="info-icon">📧</div>
              <h3>Email</h3>
              <a href="mailto:gautamv8484@gmail.com">gautamv8484@gmail.com</a>
            </div>
            <div className="info-card">
              <div className="info-icon">📱</div>
              <h3>Phone</h3>
              <a href="tel:+919974837395">+91 99748 37395</a>
            </div>
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>Location</h3>
              <p>Gandhinagar, Gujarat, India</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
          THANK YOU FOR THE APPROACH
            {/* <span className="logo-bracket">&lt;</span>
            Gautam Vyas
            <span className="logo-bracket">/&gt;</span> */}
          </div>

          <div className="footer-links">
            {["home", "about", "skills", "gallery", "resume", "contact"].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </div>

          <div className="footer-socials">
            {[
              { icon: "fa-github", link: "https://github.com/gautamv8484" },
              { icon: "fa-linkedin", link: "https://linkedin.com/in/gautamv1312" },
              { icon: "fa-instagram", link: "https://instagram.com/heyygauttam" },
            ].map((social, index) => (
              <a key={index} href={social.link} target="_blank" rel="noreferrer">
                <i className={`fa-brands ${social.icon}`}></i>
              </a>
            ))}
          </div>

          <div className="footer-copyright">
            <p>© {new Date().getFullYear()} Gautam Vyas. All rights reserved.</p>
            {/* <p className="footer-credit">
              Designed & Built with <span className="heart">❤</span> using React
            </p> */}
          </div>
        </div>

        <motion.a
          href="#home"
          className="back-to-top"
          whileHover={{ y: -5 }}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <i className="fas fa-arrow-up"></i>
        </motion.a>
      </footer>
    </div>
  );
}

export default Home;