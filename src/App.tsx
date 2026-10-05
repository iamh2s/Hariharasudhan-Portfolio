import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import ParticleField from "./components/ParticleField";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SectionDivider from "./components/SectionDivider";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Education from "./components/Education";
import Experience from "./components/Experience";

import MyWorks from "./components/MyWorks";
import NotFound from "./components/NotFound";


/* =========================================================
   HOME PAGE
========================================================= */

function Home() {
  return (
    <>
      {/* NAVBAR ONLY ON HOME */}

      <div className="relative z-50 w-full">
        <Navbar />
      </div>

      {/* HOME CONTENT */}

      <main className="relative z-10 w-full overflow-x-hidden">

        <Hero />

        <SectionDivider />

        <About />

        <SectionDivider />

        <Skills />

        <SectionDivider />

        <Projects />

        <SectionDivider />

        <Education />

        <SectionDivider />

        <Experience />

        <SectionDivider />

        <Contact />

      </main>

      {/* FOOTER ONLY ON HOME */}

      <div className="relative z-10 w-full">
        <Footer />
      </div>
    </>
  );
}


/* =========================================================
   APP
========================================================= */

export default function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      window.clearTimeout(timer);
    };

  }, []);


  return (
    <BrowserRouter>

      <div className="relative w-full min-w-0 max-w-full overflow-x-hidden">

        {/* =====================================================
            PRELOADER
        ===================================================== */}

        <Preloader loading={loading} />


        {/* =====================================================
            CUSTOM CURSOR
        ===================================================== */}

        <CustomCursor />


        {/* =====================================================
            PARTICLE BACKGROUND
        ===================================================== */}

        <div className="pointer-events-none fixed inset-0 z-0 w-full max-w-full overflow-hidden">
          <ParticleField />
        </div>


        {/* =====================================================
            APPLICATION
        ===================================================== */}

        <motion.div
          initial={{ opacity: 0 }}

          animate={{
            opacity: loading ? 0 : 1,
          }}

          transition={{
            duration: 0.5,
            delay: 0.2,
          }}

          className="
            relative
            min-h-screen
            w-full
            min-w-0
            max-w-full
            overflow-x-hidden
            bg-dark
            text-slate-400
          "
        >

          {/* =================================================
              ROUTES
          ================================================= */}

          <Routes>

            {/* HOME */}

            <Route
              path="/"
              element={<Home />}
            />


            {/* MY WORKS */}

            <Route
              path="/my-works"
              element={<MyWorks />}
            />


            {/* 404 */}

            <Route
              path="*"
              element={<NotFound />}
            />

          </Routes>

        </motion.div>

      </div>

    </BrowserRouter>
  );
}