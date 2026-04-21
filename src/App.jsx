import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Header from './components/Header';
import GameCard from './components/GameCard';
import GamePlayer from './components/GamePlayer';
import gamesData from './data/games.json';

export default function App() {
  const [activeGame, setActiveGame] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = useMemo(() => {
    const cats = new Set(gamesData.map(g => g.category));
    return Array.from(cats);
  }, []);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            game.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        onHomeClick={() => {
          setActiveGame(null);
          setSelectedCategory(null);
          setSearchTerm('');
        }}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 py-8">
        {/* Categories Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide mb-8"
        >
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-tight transition-all whitespace-nowrap ${
              !selectedCategory 
                ? 'bg-neon-primary text-dark-bg shadow-[0_0_15px_rgba(0,242,255,0.3)]' 
                : 'bg-dark-surface text-white/50 hover:text-white border border-white/5 hover:border-white/10'
            }`}
          >
            ALL GAMES
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-tight transition-all whitespace-nowrap uppercase ${
                selectedCategory === cat
                  ? 'bg-neon-secondary text-white shadow-[0_0_15px_rgba(112,0,255,0.3)]'
                  : 'bg-dark-surface text-white/50 hover:text-white border border-white/5 hover:border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Results Banner */}
        {searchTerm && (
          <div className="mb-6">
            <p className="text-white/40 text-sm font-medium">
              Showing results for <span className="text-neon-primary font-bold italic">"{searchTerm}"</span>
            </p>
          </div>
        )}

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.length > 0 ? (
            filteredGames.map((game, index) => (
              <GameCard 
                key={game.id} 
                game={game} 
                index={index} 
                onClick={setActiveGame} 
              />
            ))
          ) : (
            <div className="col-span-full py-20 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-dark-surface rounded-full flex items-center justify-center mb-4 text-white/10">
                <span className="text-4xl">?</span>
              </div>
              <h3 className="text-xl font-display font-bold text-white/60 italic">No games found</h3>
              <p className="text-white/30 text-sm mt-1">Try searching for something else or browse all games.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="py-12 px-6 md:px-12 glass border-t border-white/5 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-neon-primary/20 rounded-lg flex items-center justify-center text-neon-primary">
                <span className="font-display font-black text-xl italic">G</span>
              </div>
              <span className="font-display font-extrabold text-xl tracking-tighter italic">GAMEZONE</span>
            </div>
            <p className="text-sm text-white/30 max-w-xs font-medium">
              The ultimate destination for premium browser gaming. No blocks, no ads, just pure fun.
            </p>
          </div>
          
          <div className="flex gap-12">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-neon-primary uppercase tracking-widest mb-2">Legal</span>
              <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Terms of Use</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-neon-primary uppercase tracking-widest mb-2">Support</span>
              <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Help Center</a>
              <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/20 font-mono">
            © 2026 GAMEZONE INC. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-4 items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest">Server Status: Online</span>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {activeGame && (
          <GamePlayer 
            game={activeGame} 
            onClose={() => setActiveGame(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
