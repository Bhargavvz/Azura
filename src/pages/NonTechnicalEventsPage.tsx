import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { nonTechnicalEvents } from '../data/events';
import { EventCard } from '../components/EventCard';
import { EventModal } from '../components/EventModal';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NonTechnicalEventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<typeof nonTechnicalEvents[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = nonTechnicalEvents.filter(event => {
    return event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           event.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 pt-24 pb-16">
      {/* Back Button */}
      <Link to="/" className="absolute top-8 left-8 text-blue-200 hover:text-purple-300 transition-colors">
        <motion.div
          whileHover={{ x: -5 }}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </motion.div>
      </Link>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Non-Technical Events
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Unleash your creativity and showcase your talents in our exciting range of
            non-technical events designed to entertain and engage.
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
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-purple-500/20 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
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
                  teamSize="1-4"
                  fee={{ csi: "₹100", nonCsi: "₹150" }}
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
            className="text-center text-blue-200 mt-12"
          >
            <p className="text-lg">No events found matching your criteria.</p>
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