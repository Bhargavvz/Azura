import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Calendar, ChevronDown, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%237986cb' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
        }} />
      </div>
      
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-purple-500/10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Moving Light Effect */}
      <motion.div 
        className="absolute w-[500px] h-[500px] rounded-full bg-indigo-500/20 blur-3xl"
        animate={{
          x: ['-25vw', '25vw', '-25vw'],
          y: ['-20vh', '20vh', '-20vh'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      {/* Floating Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y, opacity }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-${Math.floor(Math.random() * 3) + 2} h-${Math.floor(Math.random() * 3) + 2} bg-gradient-to-br from-white/20 to-indigo-400/20 rounded-full`}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 5 + i * 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.5,
            }}
          />
        ))}
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-10 px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-block relative"
        >
          <motion.span 
            className="absolute -inset-1 rounded-lg blur-xl bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 opacity-70"
            animate={{ 
              filter: ["blur(10px)", "blur(20px)", "blur(10px)"],
              opacity: [0.5, 0.8, 0.5] 
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <div className="relative text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500 drop-shadow-lg animate-gradient py-2">
            AZURA 2025
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-5"
        >
          <h2 className="text-3xl font-semibold">
            <TypeAnimation
              sequence={[
                'Where Innovation Meets Excellence',
                2000,
                'Unleash Your Technical Potential',
                2000,
                'Create. Compete. Conquer.',
                2000,
              ]}
              repeat={Infinity}
              className="text-indigo-100"
            />
          </h2>
          <p className="text-xl text-sky-200 font-light max-w-2xl mx-auto">
            Department of Computer Science & Engineering
          </p>
          <div className="inline-flex items-center justify-center space-x-3 text-xl bg-white/10 backdrop-blur-md rounded-full py-3 px-6 border border-white/20">
            <Calendar className="w-6 h-6 text-indigo-300" />
            <span className="text-sky-100 font-medium">April 3rd, 2025</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(147, 51, 234, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full font-semibold text-white hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-indigo-500/50 flex items-center space-x-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>Register Now</span>
            </motion.button>
          </Link>
          <Link to="/technical">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(147, 197, 253, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent border border-indigo-400 text-indigo-100 rounded-full font-semibold hover:bg-indigo-500/20 transition-all backdrop-blur-sm"
            >
              Explore Events
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-indigo-300"
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.div>
    </section>
  );
}