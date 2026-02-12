import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface GalleryProps {
  onImageClick?: (src: string) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onImageClick }) => {
  const { currentTranslations } = useLanguage();
  const { gallery } = currentTranslations;

  const getGalleryImage = (id: number) => {
    const images: Record<number, { url: string, category: string }> = {
      1: { url: "/images/album-1.jpg", category: 'memories' },
      2: { url: "/images/careta.jpg", category: 'funny' },
      3: { url: "/images/momento-fofo.jpg", category: 'memories' },
      4: { url: "/images/garota-perfeita.jpg", category: 'calls' },
      5: { url: "/images/hahaha.jpg", category: 'funny' },
      6: { url: "/images/dormindo.jpg", category: 'funny' },
    };
    return images[id];
  };

  return (
    <section className="py-24 px-4 bg-blue-50/50">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="inline-flex items-center gap-3 bg-white px-8 py-3 rounded-full shadow-kawaii border-2 border-kawaii-blue"
          >
            <Camera className="text-kawaii-blue" size={32} />
            <h2 className="font-heading text-3xl text-kawaii-dark">{gallery.title}</h2>
          </motion.div>
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {Object.entries(gallery.captions).map(([id, caption], idx) => {
              const imageId = Number(id);
              const imageData = getGalleryImage(imageId);

              return (
                <motion.div
                  layout
                  key={imageId}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -5, 0] // Floating breathing effect
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      delay: idx * 0.2, // Stagger the floating
                      ease: "easeInOut"
                    }
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotate: 0,
                    zIndex: 10,
                    transition: { duration: 0.2 }
                  }}
                  className={`group bg-white p-4 pb-12 shadow-md hover:shadow-2xl transition-shadow duration-300 rounded-sm border border-gray-100 cursor-pointer ${idx % 2 === 0 ? 'rotate-2' : '-rotate-2'}`}
                >
                  <div
                    className="overflow-hidden bg-gray-100 mb-4 rounded-sm border border-gray-100 relative"
                    onClick={() => onImageClick?.(imageData.url)}
                  >
                    <img
                      src={imageData.url}
                      alt={caption}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-pink-500/0 group-hover:bg-pink-500/10 transition-colors duration-300" />
                  </div>

                  <p className="font-hand text-2xl text-gray-600 text-center group-hover:text-kawaii-hotpink transition-colors">
                    {caption}
                  </p>

                  {/* Cute Sticker */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1.2, rotate: 12 }}
                    className="absolute -top-3 -right-3 bg-kawaii-mint text-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="text-lg">♥</span>
                  </motion.div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};