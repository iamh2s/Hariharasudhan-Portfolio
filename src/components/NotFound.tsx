import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[calc(100vh-80px)] w-full items-center justify-center overflow-hidden bg-dark px-5 text-white">

      {/* Background glow */}

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.05] blur-[120px]" />

      <div className="relative z-10 text-center">

        {/* 404 */}

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
        >
          <h1
            className="
              text-[120px]
              font-black
              leading-none
              tracking-tighter
              text-white
              sm:text-[160px]
              lg:text-[200px]
            "
          >
            404
          </h1>
        </motion.div>

        {/* TEXT */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
          }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-primary-light">
            Page Not Found
          </p>

          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
            Looks like you got lost.
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-400 sm:text-base">
            The page you are looking for doesn't exist or may have been
            moved to another location.
          </p>
        </motion.div>

        {/* BUTTONS */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.35,
          }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >

          {/* HOME */}

          <Link
            to="/"
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-white
              px-5
              py-3
              text-sm
              font-semibold
              text-dark
              transition-all
              hover:bg-slate-100
            "
          >
            <Home size={16} />

            <span>
              Back Home
            </span>
          </Link>

          {/* BACK */}

          <button
            onClick={() => window.history.back()}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-white/[0.08]
              bg-white/[0.02]
              px-5
              py-3
              text-sm
              font-semibold
              text-slate-300
              transition-all
              hover:border-white/[0.18]
              hover:bg-white/[0.05]
              hover:text-white
            "
          >
            <ArrowLeft size={16} />

            <span>
              Go Back
            </span>
          </button>

        </motion.div>

      </div>
    </section>
  );
}