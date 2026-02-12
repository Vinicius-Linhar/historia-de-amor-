import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { Heart, Utensils, Gift, Film, PartyPopper } from 'lucide-react';
import { MemoryGame } from './MemoryGame';
import { useLanguage } from '../contexts/LanguageContext';

export const Surprise: React.FC = () => {
    const { width, height } = useWindowSize();
    const { t, currentTranslations } = useLanguage();
    const [showConfetti, setShowConfetti] = useState(false);
    const [missYouCount, setMissYouCount] = useState(0);
    const [activeTab, setActiveTab] = useState<'game' | 'secret'>('game');

    const REWARDS = [
        { clicks: 5, message: currentTranslations.surprise.rewards[0].message, icon: Heart, color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
        { clicks: 10, message: currentTranslations.surprise.rewards[1].message, icon: Gift, color: "bg-orange-100 text-orange-700 border-orange-200" },
        { clicks: 20, message: currentTranslations.surprise.rewards[2].message, icon: Film, color: "bg-blue-100 text-blue-700 border-blue-200" },
        { clicks: 33, message: currentTranslations.surprise.rewards[3].message, icon: Heart, color: "bg-purple-100 text-purple-700 border-purple-200" },
        { clicks: 50, message: currentTranslations.surprise.rewards[4].message, icon: Utensils, color: "bg-red-100 text-red-700 border-red-200" },
        { clicks: 100, message: currentTranslations.surprise.rewards[5].message, icon: PartyPopper, color: "bg-pink-100 text-pink-700 border-pink-200" },
    ];

    const handleMissYou = () => {
        const newCount = missYouCount + 1;
        setMissYouCount(newCount);

        // Check if new count matches any reward threshold
        const reward = REWARDS.find(r => r.clicks === newCount);
        if (reward) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000);
        }
    };

    const unlockedRewards = REWARDS.filter(r => missYouCount >= r.clicks);

    return (
        <section className="py-24 px-4 bg-white min-h-[600px] border-t-4 border-dashed border-kawaii-lavender">
            {showConfetti && <Confetti width={width} height={height} numberOfPieces={300} colors={['#FFB7B2', '#E2F0CB', '#B5EAD7', '#C7CEEA']} gravity={0.15} />}

            <div className="max-w-4xl mx-auto">
                <h2 className="text-center font-heading text-4xl text-kawaii-dark mb-12">{t('surprise.title')}</h2>

                {/* Navigation Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                    {[
                        { id: 'game', icon: Utensils, label: t('surprise.tabs.game'), color: 'bg-kawaii-mint' },
                        { id: 'secret', icon: Heart, label: t('surprise.tabs.secret'), color: 'bg-kawaii-pink' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all border-b-4 active:border-b-0 active:translate-y-1 font-heading text-lg ${activeTab === tab.id
                                ? `${tab.color} border-black/10 text-white`
                                : 'bg-gray-100 border-gray-200 text-gray-500 hover:bg-gray-200'
                                }`}
                        >
                            <tab.icon size={20} />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                <div className="bg-white rounded-[3rem] p-8 md:p-12 min-h-[350px] shadow-kawaii border-4 border-kawaii-pinkLight relative overflow-hidden flex items-center justify-center">
                    {/* Background Decoration */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-30" style={{ backgroundImage: 'radial-gradient(#E0BBE4 15%, transparent 16%)', backgroundSize: '20px 20px' }} />

                    <AnimatePresence mode='wait'>

                        {activeTab === 'game' && (
                            <motion.div
                                key="game"
                                initial={{ opacity: 0, rotate: -2 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 2 }}
                                className="w-full relative z-10"
                            >
                                <MemoryGame />
                            </motion.div>
                        )}

                        {activeTab === 'secret' && (
                            <motion.div
                                key="secret"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="text-center relative z-10 w-full max-w-md mx-auto"
                            >
                                <h3 className="text-3xl font-heading text-kawaii-dark mb-2">{t('surprise.secret.title')}</h3>
                                <p className="text-gray-400 mb-8 font-bold">{t('surprise.secret.subtitle')}</p>

                                <button
                                    onClick={handleMissYou}
                                    className="relative group bg-kawaii-pink text-white w-40 h-40 rounded-full shadow-kawaii active:scale-95 transition-all flex items-center justify-center mx-auto"
                                >
                                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-full transition-opacity" />
                                    <div className="flex flex-col items-center">
                                        <Heart size={48} fill="currentColor" className="mb-2 animate-pulse" />
                                        <span className="font-heading text-lg">{showConfetti ? t('surprise.secret.button_active') : t('surprise.secret.button_label')}</span>
                                    </div>
                                </button>

                                <p className="mt-6 text-2xl font-hand text-kawaii-hotpink">{t('surprise.secret.counter', { count: missYouCount })}</p>

                                {/* Unlocked Rewards */}
                                <div className="mt-8 space-y-2">
                                    {unlockedRewards.length > 0 && unlockedRewards.map((reward, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`p-3 rounded-xl border ${reward.color} flex items-center gap-3 text-left`}
                                        >
                                            <reward.icon size={20} />
                                            <span className="font-bold text-sm">{reward.message}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};