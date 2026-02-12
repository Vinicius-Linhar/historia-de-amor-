import React, { useEffect } from 'react';
import { Hero } from './components/Hero';
import { Timeline } from './components/Timeline';
import { Gallery } from './components/Gallery';
import { Letter } from './components/Letter';
import { Surprise } from './components/Surprise';
import { MusicControl } from './components/MusicControl';
import { FloatingDecor } from './components/FloatingDecor';

import { ImageModal } from './components/ImageModal';

import { LanguageProvider } from './contexts/LanguageContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';

function App() {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  // Smooth scroll behavior for the whole document
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <LanguageProvider>
      <main className="w-full min-h-screen bg-white relative">
        <LanguageSwitcher />
        <FloatingDecor /> {/* Adiciona a chuva de fofura no fundo */}
        <ImageModal
          isOpen={!!selectedImage}
          imageSrc={selectedImage}
          onClose={() => setSelectedImage(null)}
        />

        <div className="relative z-10">
          <Hero />
          <Timeline onImageClick={setSelectedImage} />
          <Gallery onImageClick={setSelectedImage} />
          <Letter />
          <Surprise />

          {/* Footer */}
          <footer className="bg-kawaii-dark text-white py-12 text-center text-sm relative overflow-hidden">
            {/* Cute Footer Pattern */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-kawaii-pink via-kawaii-purple to-kawaii-blue" />

            <p className="font-heading text-lg mb-2">Feito com muito 💖 e ☕</p>
            <p className="font-hand text-2xl opacity-80">para o amor da minha vida.</p>
            <p className="mt-6 text-xs opacity-40 font-mono">&copy; {new Date().getFullYear()} Nossa História Fofa</p>
          </footer>
        </div>

        <MusicControl />
      </main>
    </LanguageProvider>
  );
}

export default App;