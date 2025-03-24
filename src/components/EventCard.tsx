import { motion } from 'framer-motion';
import { Clock, Users, Tag } from 'lucide-react';

interface EventCardProps {
  title: string;
  description: string;
  image: string;
  teamSize: string;
  fee: {
    csi: string;
    nonCsi: string;
  };
  onClick: () => void;
}

export function EventCard({ title, description, image, teamSize, fee, onClick }: EventCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      className="relative group h-full bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl overflow-hidden border border-indigo-500/20 shadow-xl cursor-pointer"
    >
      {/* Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 to-purple-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
      
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
        
        {/* Card Tag - positioned on the image */}
        <div className="absolute top-3 left-3 z-20 bg-indigo-600/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white shadow-lg flex items-center space-x-1">
          <Clock className="w-3 h-3 mr-1" />
          <span>April 3, 2025</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-20">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{title}</h3>
        <p className="text-sky-200 text-sm mb-4 line-clamp-2">{description}</p>
        
        {/* Details */}
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <Users className="w-4 h-4 mr-2 text-indigo-400" />
            <span className="text-indigo-200">Team Size: <span className="text-white font-medium">{teamSize}</span></span>
          </div>
          
          <div className="flex items-center text-sm">
            <Tag className="w-4 h-4 mr-2 text-indigo-400" />
            <span className="text-indigo-200 flex flex-col">
              <span>CSI: <span className="text-white font-medium">{fee.csi}</span></span>
              <span>Non-CSI: <span className="text-white font-medium">{fee.nonCsi}</span></span>
            </span>
          </div>
        </div>
        
        {/* View Button */}
        <div className="mt-6">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2 px-4 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 hover:from-indigo-500/50 hover:to-purple-500/50 rounded-lg text-white text-sm font-medium border border-indigo-500/40 backdrop-blur-sm transition-all duration-300"
          >
            View Details
          </motion.button>
        </div>
        
        {/* Corner Accent */}
        <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-full blur-xl"></div>
      </div>
    </motion.div>
  );
}