import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Heart, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface TimelineProps {
  onImageClick?: (src: string) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ onImageClick }) => {
  const { currentTranslations } = useLanguage();
  const { timeline } = currentTranslations;

  return (
    <section className="py-20 px-4 overflow-hidden relative">
      {/* Background Dots */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#FFB7B2 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
            className="inline-block bg-kawaii-mint px-6 py-2 rounded-full shadow-kawaii -rotate-2 border-2 border-white"
          >
            <h2 className="font-heading text-3xl md:text-5xl text-white drop-shadow-sm">{timeline.title}</h2>
          </motion.div>
        </motion.div>

        <div className="relative">
          {/* Central Line - Animated Drawing */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-4 md:left-1/2 top-0 w-1 bg-kawaii-lavender border-r-2 border-dashed border-white md:-translate-x-1/2"
            style={{ borderRightStyle: 'dashed' }}
          />

          <div className="space-y-16">
            {timeline.events.map((event: any, index: number) => (
              <TimelineItem
                key={event.id}
                event={event}
                index={index}
                onImageClick={onImageClick}
                image={getImageForEvent(event.id)} // Helper to get image since translations don't have it
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper function to map IDs to images (since images are static)
const getImageForEvent = (id: number) => {
  const images: Record<number, string> = {
    1: "/images/chat-inicio.png",
    2: "/images/4-meses.jpg",
    3: "/images/6-meses.jpg",
    4: "/images/11-meses.jpg"
  };
  return images[id] || "";
};

interface TimelineItemProps {
  event: any;
  index: number;
  onImageClick?: (src: string) => void;
  image: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ event, index, onImageClick, image }) => {
  const isEven = index % 2 === 0;
  const colors = ['bg-kawaii-pink', 'bg-kawaii-lavender', 'bg-kawaii-mint', 'bg-kawaii-blue'];
  const cardColor = colors[index % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", bounce: 0.5 }}
      className={`relative flex flex-col md:flex-row gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Date Badge - Pops in */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, type: "spring" }}
        className="absolute left-0 md:left-1/2 w-10 h-10 rounded-full bg-white border-4 border-kawaii-hotpink shadow-md flex items-center justify-center z-10 md:-translate-x-1/2 mt-2"
      >
        <Star size={18} className="text-kawaii-hotpink" fill="currentColor" />
      </motion.div>

      {/* Content Side */}
      <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
        <motion.div
          whileHover={{ scale: 1.05, rotate: isEven ? 2 : -2 }} // Wiggle on hover
          className={`${cardColor} p-6 rounded-3xl shadow-kawaii border-4 border-white ${isEven ? 'rotate-1' : '-rotate-1'}`}
        >
          <div className="bg-white/90 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-kawaii-hotpink text-sm font-bold mb-2">
              <Calendar size={16} />
              <span className="bg-white px-2 py-0.5 rounded-md shadow-sm">{event.date}</span>
            </div>
            <h3 className="font-heading text-2xl text-kawaii-dark mb-2">{event.title}</h3>
            <p className="font-body text-gray-600 leading-relaxed mb-4">{event.description}</p>
            <div
              className="rounded-xl overflow-hidden h-48 w-full border-4 border-white shadow-sm group cursor-pointer"
              onClick={() => onImageClick?.(image)}
            >
              <img
                src={image}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Empty side for balance */}
      <div className="hidden md:block md:w-1/2" />
    </motion.div>
  );
};