import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Trophy, Calendar, Clock, Share2, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    title: string;
    description: string;
    image: string;
    teamSize: string;
    fee: {
      csi: string;
      nonCsi: string;
    };
    contacts?: {
      name: string;
      phone?: string;
      link?: string;
    }[];
    registrationLink?: string;
  };
}

export function EventModal({ isOpen, onClose, event }: EventModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div 
              className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-indigo-500/20 rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-indigo-600/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-600/30 rounded-full blur-3xl"></div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image */}
              <div className="relative h-64 sm:h-80">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                
                {/* Event date badge */}
                <div className="absolute top-4 left-4 bg-indigo-600/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white shadow-lg flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">April 3, 2025</span>
                </div>
                
                {/* Title */}
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400 drop-shadow-lg">{event.title}</h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 pt-4 relative">
                {/* Description */}
                <div className="prose prose-invert max-w-none mb-8">
                  <p className="text-sky-100/90 leading-relaxed">{event.description}</p>
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 rounded-lg bg-indigo-500/20">
                        <Users className="w-5 h-5 text-indigo-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">Team Size</h3>
                    </div>
                    <p className="text-indigo-200 pl-12">{event.teamSize} members</p>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 rounded-lg bg-indigo-500/20">
                        <Trophy className="w-5 h-5 text-indigo-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">Registration Fee</h3>
                    </div>
                    <div className="text-indigo-200 pl-12">
                      <div>CSI Members: <span className="text-white font-medium">{event.fee.csi}</span></div>
                      <div>Non-CSI Members: <span className="text-white font-medium">{event.fee.nonCsi}</span></div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                {event.contacts && event.contacts.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-white mb-4">Contact Coordinators</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {event.contacts.map((contact, index) => (
                        <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-lg bg-indigo-500/20">
                              <Phone className="w-5 h-5 text-indigo-400" />
                            </div>
                            <div>
                              <p className="text-white font-medium">{contact.name}</p>
                              {contact.phone && (
                                <a href={`tel:${contact.phone}`} className="text-indigo-300 hover:text-indigo-200">
                                  {contact.phone}
                                </a>
                              )}
                              {contact.link && (
                                <a href={contact.link} target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:text-indigo-200">
                                  Join WhatsApp Group
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Registration Link */}
                {event.registrationLink && (
                  <div className="mt-8">
                    <Link
                      to="/register"
                      className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                      Register Now
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}