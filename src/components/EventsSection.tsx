import { EventCard } from './EventCard';
import { technicalEvents, nonTechnicalEvents } from '../data/events';

export function EventsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400 mb-4">
            Events
          </h2>
          <p className="text-lg text-indigo-200">
            Explore our exciting lineup of technical and non-technical events
          </p>
        </div>

        {/* Technical Events */}
        <div className="space-y-8 mb-16">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
            Technical Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalEvents.map((event) => (
              <EventCard key={event.title} event={event} />
            ))}
          </div>
        </div>

        {/* Non-Technical Events */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
            Non-Technical Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nonTechnicalEvents.map((event) => (
              <EventCard key={event.title} event={event} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 