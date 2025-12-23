import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustedBy from "./components/TrustedBy";
import Services from "./components/Services";
import OurWork from "./components/OurWork";
import Teams from "./components/Teams";
import ContactUs from "./components/ContactUs";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";

const App = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  // posisi mouse asli
  const mouse = useRef({ x: 0, y: 0 });
  // posisi smooth outline
  const position = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let hasMouse = false;

    const handleMouseMove = (e) => {
      // aktifkan cursor hanya jika mouse benar-benar dipakai
      if (!hasMouse) {
        document.documentElement.classList.add("has-mouse");
        hasMouse = true;
      }

      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      position.current.x += (mouse.current.x - position.current.x) * 0.12;
      position.current.y += (mouse.current.y - position.current.y) * 0.12;

      if (dotRef.current && outlineRef.current) {
        dotRef.current.style.left = `${mouse.current.x}px`;
        dotRef.current.style.top = `${mouse.current.y}px`;

        outlineRef.current.style.left = `${position.current.x}px`;
        outlineRef.current.style.top = `${position.current.y}px`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="bg-white dark:bg-black relative">
      <Toaster />
      <Navbar theme={theme} setTheme={setTheme} />
      <Hero />
      <TrustedBy />
      <Services />
      <OurWork />
      <Teams />
      <ContactUs />
      <Footer theme={theme} />

      {/* Cursor Outline */}
      <div
        ref={outlineRef}
        className="custom-cursor fixed top-0 left-0 w-7 h-7 rounded-full border border-primary pointer-events-none z-[9999]"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* Cursor Dot */}
      <div
        ref={dotRef}
        className="custom-cursor fixed top-0 left-0 w-3 h-3 rounded-full bg-primary pointer-events-none z-[9999]"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </div>
  );
};

export default App;
