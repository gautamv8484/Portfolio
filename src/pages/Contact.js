import React, { useState } from "react";
import { motion } from "framer-motion";
import "../style.css";
import Navbar from "../components/Navbar";

function Contact() {
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

    // Create FormData
    const formData = new FormData();
    formData.append("access_key", "feaead84-f5b0-42ee-951c-5f6f47d30ab6"); // Replace with your actual key
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
      console.error("Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="main1">
      <Navbar />

      {/* Content */}
      <div className="container">
        <motion.div
          className="heading"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Let's Connect & Collaborate 💙</h1>
          <p>
            Whether it's a new project, collaboration, or just say hi — I'd love to hear from you.
          </p>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          className="icons1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.a
            href="https://instagram.com/heyygauttam"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.2, y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fa-brands fa-instagram"></i>
          </motion.a>

          <motion.a
            href="https://facebook.com/Gautam Vyas"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.2, y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fa-brands fa-facebook"></i>
          </motion.a>

          <motion.a
            href="https://wa.me/9974837395"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.2, y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fa-brands fa-whatsapp"></i>
          </motion.a>

          <motion.a
            href="https://linkedin.com/in/gautamv1312"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.2, y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fa-brands fa-linkedin"></i>
          </motion.a>

          <motion.a
            href="mailto:gautamv8484@gmail.com"
            whileHover={{ scale: 1.2, y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fa-regular fa-message"></i>
          </motion.a>
        </motion.div>

        {/* Form */}
        <motion.form
          className="msg"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
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
              <>
                <span className="spinner"></span>
                Sending...
              </>
            ) : (
              <>
                🚀 Send Message
              </>
            )}
          </motion.button>

          {/* Success/Error Messages */}
          {submitStatus === "success" && (
            <motion.div
              className="submit-success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <i className="fas fa-check-circle"></i>
              <p>Message sent successfully! I'll get back to you soon.</p>
            </motion.div>
          )}

          {submitStatus === "error" && (
            <motion.div
              className="submit-error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <i className="fas fa-exclamation-circle"></i>
              <p>Oops! Something went wrong. Please try again.</p>
            </motion.div>
          )}
        </motion.form>

        {/* Contact Info Cards */}
        <motion.div
          className="contact-info-cards"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
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
            <p>Surat, Gujarat, India</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Contact;