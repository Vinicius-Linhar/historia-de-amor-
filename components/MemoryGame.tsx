
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Romantic Pairs for the game
// const ROMANTIC_PAIRS = [
//   { emoji: '❤️', text: 'Eu amo você.' },
//   { emoji: '💞', text: 'Amo cada detalhe seu.' },
//   { emoji: '💘', text: 'Amo estar com você, mesmo de longe.' },
//   { emoji: '💓', text: 'Amo quem eu sou quando estou com você.' },
//   { emoji: '💖', text: 'Amo nosso jeito.' },
//   { emoji: '💗', text: 'Amo a nossa história.' },
//   { emoji: '💕', text: 'Amo pensar no nosso futuro.' },
//   { emoji: '💝', text: 'Amo você mais a cada dia.' },
// ];

interface Card {
  id: number;
  emoji: string;
  text: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const MemoryGame: React.FC = () => {
  const { width, height } = useWindowSize();
  const { t, currentTranslations } = useLanguage();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showBath, setShowBath] = useState(false);

  // Initialize game
  useEffect(() => {
    shuffleCards();
  }, [currentTranslations]); // Re-shuffle when language changes to update text

  const shuffleCards = () => {
    const pairs = currentTranslations.surprise.game.pairs;
    const shuffled = [...pairs, ...pairs]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        id: index,
        emoji: item.emoji,
        text: item.text,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(shuffled);
    setFlippedCards([]);
    setMatches(0);
    setGameWon(false);
    setMoves(0);
    setShowBath(false);
  };

  const handleCardClick = (id: number) => {
    // Prevent clicking if already flipped, matched, or if 2 cards are already open
    if (cards[id].isFlipped || cards[id].isMatched || flippedCards.length >= 2) return;

    // Flip the clicked card
    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    // Check for match if 2 cards are flipped
    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      const [firstId, secondId] = newFlipped;

      if (cards[firstId].emoji === cards[secondId].emoji) {
        // Match found!
        setTimeout(() => {
          setCards(prev => prev.map(card =>
            card.id === firstId || card.id === secondId
              ? { ...card, isMatched: true }
              : card
          ));
          setFlippedCards([]);
          setMatches(prev => {
            const newMatches = prev + 1;
            if (newMatches === currentTranslations.surprise.game.pairs.length) setGameWon(true);
            return newMatches;
          });
        }, 500);
      } else {
        // No match, flip back
        setTimeout(() => {
          setCards(prev => prev.map(card =>
            card.id === firstId || card.id === secondId
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto relative">
      {gameWon && <Confetti width={width} height={height} numberOfPieces={200} recycle={false} />}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-heading text-kawaii-dark mb-2">
          {gameWon ? t('surprise.game.title_won') : t('surprise.game.title_playing')}
        </h3>
        <p className="text-gray-500 font-body">{t('surprise.game.moves')}: <span className="font-bold text-kawaii-hotpink">{moves}</span></p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <AnimatePresence>
          {cards.map((card) => (
            <motion.div
              key={card.id}
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square cursor-pointer relative perspective-1000`}
            >
              <div
                className={`w-full h-full transition-all duration-500 transform-style-3d relative rounded-xl shadow-kawaii border-2 ${card.isFlipped ? 'rotate-y-180 border-kawaii-pink' : 'bg-white border-kawaii-blue'
                  } `}
                style={{ transformStyle: 'preserve-3d', transform: card.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
              >
                {/* Back of Card (Question Mark) */}
                <div
                  className="absolute inset-0 backface-hidden flex items-center justify-center bg-kawaii-cream rounded-xl"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <span className="text-2xl opacity-50">💌</span>
                </div>

                {/* Front of Card (Emoji + Text) */}
                <div
                  className="absolute inset-0 backface-hidden flex flex-col items-center justify-center bg-white rounded-xl rotate-y-180 p-1 text-center"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <span className="text-2xl mb-1 leading-none">{card.emoji}</span>
                  <span className="text-[10px] leading-tight font-body text-gray-600 line-clamp-3 overflow-hidden text-clip">{card.text}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {gameWon && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center flex flex-col items-center gap-4"
        >
          <p className="text-xl font-hand text-kawaii-dark">{t('surprise.game.completed', { moves })}</p>

          <button
            onClick={() => setShowBath(true)}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-bold shadow-kawaii hover:scale-105 transition-all animate-bounce"
          >
            {t('surprise.game.reward_btn')}
          </button>

          <button
            onClick={shuffleCards}
            className="px-6 py-2 bg-gray-200 text-gray-600 rounded-full font-bold hover:bg-gray-300 transition-all text-sm"
          >
            {t('surprise.game.play_again')}
          </button>
        </motion.div>
      )}

      {/* Bath Reward Modal */}
      <AnimatePresence>
        {showBath && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setShowBath(false)}
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 10 }}
              className="relative max-w-[95vw] max-h-[95vh] bg-white p-2 rounded-3xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowBath(false)}
                className="absolute -top-4 -right-4 bg-white text-red-500 p-2 rounded-full shadow-lg hover:bg-red-50 transition-colors z-10"
              >
                <X size={24} />
              </button>
              <img
                src="/images/bath.jpg"
                alt="Recompensa Bath"
                className="w-full h-auto max-h-[90vh] object-contain rounded-2xl border-4 border-kawaii-pink"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
