import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Cloud } from 'lucide-react';
import { calculateTimeDifference } from '../utils/time';
import { START_DATE, COUPLE_NAMES, HERO_QUOTE } from '../constants';
import { TimeCounter } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [time, setTime] = useState<TimeCounter>(calculateTimeDifference(START_DATE));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTimeDifference(START_DATE));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20">

      {/* Floating Kawaii Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-20 left-10 text-kawaii-pinkLight opacity-60">
          <Cloud size={80} fill="currentColor" />
        </motion.div>
        <motion.div animate={{ y: [0, -30, 0] }} transition={{ repeat: Infinity, duration: 6, delay: 1 }} className="absolute bottom-40 right-10 text-kawaii-blue opacity-60">
          <Cloud size={100} fill="currentColor" />
        </motion.div>
        <motion.div animate={{ rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute top-40 right-1/4 text-yellow-200">
          <Star size={40} fill="currentColor" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">

        {/* Names */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
            className="bg-white/60 backdrop-blur-md px-8 py-3 rounded-full inline-block mb-6 shadow-kawaii cursor-default border-2 border-white/50"
          >
            <h1 className="font-heading text-4xl md:text-6xl text-kawaii-hotpink drop-shadow-sm tracking-tight">
              {COUPLE_NAMES}
            </h1>
          </motion.div>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mb-10 max-w-2xl"
        >
          <p className="font-hand text-2xl md:text-3xl text-kawaii-dark font-bold leading-relaxed drop-shadow-sm">
            ✨ {t('hero.quote')} ✨
          </p>
        </motion.div>

        {/* Counter - Cute Bubbles */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="flex flex-wrap justify-center gap-3 md:gap-6"
        >
          <TimeUnit value={time.days} label={t('hero.days')} color="bg-kawaii-pink" />
          <TimeUnit value={time.hours} label={t('hero.hours')} color="bg-kawaii-lavender" />
          <TimeUnit value={time.minutes} label={t('hero.minutes')} color="bg-kawaii-mint" />
          <TimeUnit value={time.seconds} label={t('hero.seconds')} color="bg-kawaii-blue" />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Infinity }}
          className="mt-16 opacity-50"
        >
          <div className="w-6 h-10 border-2 border-kawaii-dark/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-kawaii-dark/30 rounded-full animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const TimeUnit: React.FC<{ value: number, label: string, color: string }> = ({ value, label, color }) => (
  <motion.div
    whileHover={{ y: -10, scale: 1.1 }} // Pop up on hover
    className={`flex flex-col items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-3xl ${color} shadow-kawaii border-[3px] border-white transform rotate-2 hover:rotate-0 transition-all`}
  >
    <span className="font-heading text-2xl md:text-4xl font-bold text-white drop-shadow-sm">{String(value).padStart(2, '0')}</span>
    <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/90">{label}</span>
  </motion.div>
);