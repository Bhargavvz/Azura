import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Instagram, 
  Twitter, 
  Facebook, 
  Linkedin, 
  ChevronRight,
  Sparkles 
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Top wave pattern */}
      <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Logo & about section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5 space-y-6"
          >
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-indigo-400" />
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
                AZURA 2025
              </h2>
            </div>
            <p className="text-indigo-200">
              AZURA 2025 is the annual technical fest organized by the Department of Computer Science & Technology
              at CMR College of Engineering & Technology.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              {[Instagram, Twitter, Facebook, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20 hover:text-white transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-3 space-y-4"
          >
            <h3 className="text-xl font-semibold text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['Home', 'Technical Events', 'Non-Technical Events', 'Register', 'About Us'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-indigo-200 hover:text-white transition-colors inline-flex items-center space-x-1 group">
                    <ChevronRight className="w-4 h-4 text-indigo-500 transform group-hover:translate-x-1 transition-transform" />
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4 space-y-4"
          >
            <h3 className="text-xl font-semibold text-white">
              Contact Us
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 text-indigo-200">
                <Phone className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Event Coordinators</p>
                  <p>Shiva Sudam - 9618665095</p>
                  <p>Prince - 8008574554</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-indigo-200">
                <Mail className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <a href="mailto:cse_azura@cmrcet.ac.in" className="hover:text-white transition-colors">
                  cse_azura@cmrcet.ac.in
                </a>
              </div>
              
              <div className="flex items-start space-x-3 text-indigo-200">
                <MapPin className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p>CMR College of Engineering & Technology</p>
                  <p>Department of Computer Science & Technology</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-indigo-200">
                <Globe className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <a 
                  href="https://cmrcet.ac.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sky-400 hover:text-sky-300 transition-colors"
                >
                  www.cmrcet.ac.in
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 pt-8 border-t border-indigo-500/20 text-center text-indigo-300 text-sm"
        >
          <p>
            © 2025 AZURA - Department of Computer Science & Technology. All rights reserved.
          </p>
          <p className="mt-2 text-indigo-400">
            Designed with <span className="text-pink-500">♥</span> for CMRCET
          </p>
        </motion.div>
      </div>
    </footer>
  );
}