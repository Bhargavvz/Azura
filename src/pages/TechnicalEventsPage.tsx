import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { technicalEvents } from '../data/events';
import { EventCard } from '../components/EventCard';
import { EventModal } from '../components/EventModal';
import { ArrowLeft, Search, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TechnicalEventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<typeof technicalEvents[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = technicalEvents.filter(event => {
    return event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           event.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 pt-24 pb-16">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"></div>
      </div>

      {/* Back Button */}
      <Link to="/" className="absolute top-24 left-8 z-10">
        <motion.div
          whileHover={{ x: -5 }}
          className="flex items-center gap-2 text-indigo-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </motion.div>
      </Link>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block relative mb-4">
            <motion.span 
              className="absolute -inset-1 rounded-lg blur-xl bg-gradient-to-r from-indigo-400 to-purple-400 opacity-50"
              animate={{ 
                filter: ["blur(10px)", "blur(15px)", "blur(10px)"],
                opacity: [0.3, 0.5, 0.3] 
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <h1 className="relative text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500">
              Technical Events
            </h1>
          </div>
          <p className="text-indigo-100 text-lg max-w-2xl mx-auto">
            Showcase your technical prowess and problem-solving skills in our diverse range of
            competitive events designed to challenge and inspire.
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white/5 backdrop-blur-md border border-indigo-500/20 text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent shadow-lg"
              />
            </div>
          </div>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <EventCard
                  title={event.title}
                  image={event.image}
                  description={event.description}
                  teamSize={event.teamSize}
                  fee={event.fee}
                  onClick={() => setSelectedEvent(event)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results Message */}
        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center justify-center p-8 rounded-xl bg-white/5 backdrop-blur-md border border-indigo-500/20">
              <div className="text-center">
                <Sparkles className="w-12 h-12 text-indigo-400 mx-auto mb-4 opacity-50" />
                <p className="text-lg text-indigo-100">No events found matching your criteria.</p>
                <p className="text-indigo-300 mt-2">Try adjusting your search term.</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <EventModal
            isOpen={selectedEvent !== null}
            onClose={() => setSelectedEvent(null)}
            event={selectedEvent}
          />
        )}
      </AnimatePresence>
    </div>
  );
}