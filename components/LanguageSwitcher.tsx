import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const languages = [
    { code: 'pt', label: '🇧🇷 Português' },
    { code: 'en', label: '🇺🇸 English' },
    { code: 'th', label: '🇹🇭 ไทย' }
];

export const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed top-6 right-6 z-50">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-kawaii border-2 border-kawaii-pink text-kawaii-dark hover:bg-white transition-colors"
            >
                <Globe size={24} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute top-14 right-0 w-48 bg-white rounded-2xl shadow-xl border-2 border-kawaii-pink overflow-hidden origin-top-right"
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    setLanguage(lang.code as any);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-3 hover:bg-kawaii-pinkLight/30 transition-colors flex items-center gap-2 font-heading ${language === lang.code ? 'bg-kawaii-pinkLight/50 text-kawaii-hotpink' : 'text-gray-600'
                                    }`}
                            >
                                <span>{lang.label}</span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
