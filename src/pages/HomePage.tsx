import { motion } from 'framer-motion';
import { HeroSection } from '../components/HeroSection';
import { EventCard } from '../components/EventCard';
import { technicalEvents, nonTechnicalEvents } from '../data/events';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      <HeroSection />

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400 mb-6">
              About AZURA 2025
            </h2>
            <p className="text-lg text-indigo-200">
              AZURA is CMR College of Engineering & Technology's premier technical festival,
              bringing together the brightest minds in technology and innovation. Join us for
              an extraordinary celebration of creativity, technical excellence, and entertainment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Preview */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Technical Events */}
          <div className="mb-20">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
                Technical Events
              </h2>
              <Link to="/technical" className="text-indigo-400 hover:text-indigo-300 flex items-center group transition-colors">
                View All <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {technicalEvents.slice(0, 3).map((event) => (
                <EventCard key={event.title} event={event} />
              ))}
            </div>
          </div>

          {/* Non-Technical Events */}
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
                Non-Technical Events
              </h2>
              <Link to="/non-technical" className="text-indigo-400 hover:text-indigo-300 flex items-center group transition-colors">
                View All <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {nonTechnicalEvents.slice(0, 3).map((event) => (
                <EventCard key={event.title} event={event} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}