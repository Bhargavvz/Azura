import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/technical', label: 'Technical Events' },
    { path: '/non-technical', label: 'Non-Technical Events' },
    { path: '/register', label: 'Register' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/80 backdrop-blur-md shadow-lg border-b border-indigo-500/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-7 w-7 text-indigo-400" />
            <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400">
              AZURA 2025
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-lg text-sky-100 hover:text-white transition-colors ${
                  location.pathname === link.path 
                    ? 'text-white' 
                    : ''
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {location.pathname === link.path && (
                  <motion.span
                    layoutId="navHighlight"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
            
            <Link to="/register" className="ml-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white font-medium hover:from-indigo-600 hover:to-purple-600 shadow-md hover:shadow-indigo-500/30 transition-all duration-300"
              >
                Register Now
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-300 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-gradient-to-b from-slate-900/90 to-indigo-900/90 backdrop-blur-md border-t border-indigo-500/20"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-2 rounded-lg text-sky-100 hover:text-white transition-colors ${
                      location.pathname === link.path 
                        ? 'bg-indigo-500/20 text-white' 
                        : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/register"
                  className="block px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white font-medium hover:from-indigo-600 hover:to-purple-600 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}