import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

import Home from "./pages/Home";

import "./style.css";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* You can keep other routes for direct access */}
        <Route path="/about" element={<Home />} />
        <Route path="/skills" element={<Home />} />
        <Route path="/gallery" element={<Home />} />
        <Route path="/resume" element={<Home />} />
        <Route path="/contact" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;