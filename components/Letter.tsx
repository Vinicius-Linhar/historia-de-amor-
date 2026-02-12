import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Letter: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-4 bg-kawaii-pinkLight/30 flex justify-center items-center relative overflow-hidden">

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="relative bg-white max-w-2xl w-full p-8 md:p-12 shadow-kawaii rounded-3xl -rotate-1 border-4 border-white"
      >
        {/* Notebook Lines CSS */}
        <div className="absolute inset-0 rounded-3xl opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#999 1px, transparent 1px)',
            backgroundSize: '100% 2rem',
            marginTop: '5rem'
          }}
        />

        {/* Washi Tape Decor */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-kawaii-mint/80 transform -rotate-2 opacity-80" />

        <div className="flex justify-center mb-6 text-kawaii-hotpink animate-pulse">
          <Heart size={40} fill="currentColor" />
        </div>

        <h2 className="font-heading text-4xl text-center text-kawaii-dark mb-8">{t('letter.title')}</h2>

        <div className="font-hand text-2xl md:text-3xl text-gray-700 leading-loose whitespace-pre-wrap relative z-10">
          {t('letter.content')}
        </div>

        <div className="mt-12 text-right font-hand text-3xl text-kawaii-hotpink font-bold whitespace-pre-wrap">
          {t('letter.closing')}
        </div>
      </motion.div>
    </section>
  );
};