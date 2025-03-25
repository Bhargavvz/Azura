import { motion } from 'framer-motion';
import { CalendarDays, Users, Tag } from 'lucide-react';

interface EventCardProps {
  event: {
    title: string;
    description: string;
    image: string;
    teamSize: string;
    fee: {
      csi: string;
      nonCsi: string;
    };
  };
}

export function EventCard({ event }: EventCardProps) {
  if (!event) {
    return null;
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative flex flex-col h-[400px] rounded-lg overflow-hidden border border-indigo-600/30"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A1A] via-[#0A0E2A]/90 to-[#0A0E2A]/80" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full p-4">
        {/* Date */}
        <div className="flex items-center gap-2 text-blue-400 bg-blue-900/30 self-start px-2 py-1 rounded-full">
          <CalendarDays className="w-4 h-4" />
          <span className="text-xs font-medium">April 3, 2025</span>
        </div>

        {/* Spacer to push content to middle */}
        <div className="flex-grow min-h-[60px]"></div>

        {/* Title and Description */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
          <p className="text-gray-300 text-sm line-clamp-2">{event.description}</p>
        </div>

        {/* Team Size */}
        <div className="flex items-center gap-2 text-gray-300 mb-2">
          <Users className="w-4 h-4 text-blue-400" />
          <span className="text-sm">Team Size: {event.teamSize}</span>
        </div>

        {/* Fee Information */}
        <div className="flex flex-col gap-1 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <Tag className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300">CSI: </span>
            <span className="text-blue-400 font-medium">{event.fee.csi}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4"></div>
            <span className="text-gray-300">Non-CSI: </span>
            <span className="text-blue-400 font-medium">{event.fee.nonCsi}</span>
          </div>
        </div>

        {/* View Details Button */}
        <button className="w-full py-3 text-center text-sm font-medium text-white bg-blue-900/50 hover:bg-blue-800/70 border border-blue-600/30 rounded-lg transition-colors">
          View Details
        </button>
      </div>
    </motion.div>
  );
}