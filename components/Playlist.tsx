import React from 'react';
import { motion } from 'framer-motion';
import { PLAYLIST_DATA } from '../constants';
import { Music, Disc, Headphones } from 'lucide-react';

export const Playlist: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-kawaii-lavender/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
        >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-kawaii animate-spin-slow border-4 border-kawaii-purple">
                 <Disc className="w-10 h-10 text-kawaii-purple" />
            </div>
            <h2 className="font-heading text-4xl text-kawaii-dark mb-4">Nossa Playlist 🎵</h2>
            <p className="font-body text-gray-600 bg-white px-4 py-1 rounded-full inline-block shadow-sm">Músicas para dançar na sala</p>
        </motion.div>

        <div className="grid gap-4">
            {PLAYLIST_DATA.map((song, index) => (
                <motion.div
                    key={song.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 bg-white p-4 rounded-3xl shadow-sm hover:shadow-kawaii transition-all hover:-translate-x-1 border-2 border-transparent hover:border-kawaii-mint"
                >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-kawaii-blue to-kawaii-purple flex items-center justify-center flex-shrink-0 text-white shadow-inner">
                        <Headphones size={24} />
                    </div>
                    <div className="flex-grow">
                        <h3 className="font-heading font-bold text-lg text-gray-800">{song.title}</h3>
                        <p className="text-kawaii-hotpink text-sm font-bold">{song.artist}</p>
                    </div>
                    <div className="text-right max-w-[200px] hidden md:block">
                        <p className="text-sm italic text-gray-400 font-hand text-lg">"{song.description}"</p>
                    </div>
                </motion.div>
            ))}
        </div>
        
        {/* Cute Player Widget Placeholder */}
        <div className="mt-12 p-6 bg-white rounded-3xl text-center shadow-kawaii border-4 border-kawaii-blue">
            <p className="font-heading text-kawaii-blue mb-4">Tocando agora no meu ❤️</p>
            <div className="h-4 bg-gray-100 rounded-full w-2/3 mx-auto overflow-hidden">
                <div className="h-full bg-kawaii-hotpink w-1/2 rounded-full animate-pulse" />
            </div>
            <div className="flex justify-center gap-6 mt-4 text-gray-400">
                <span>⏮</span>
                <span className="text-kawaii-dark text-2xl">▶</span>
                <span>⏭</span>
            </div>
        </div>
      </div>
    </section>
  );
};