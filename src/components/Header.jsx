import { Search, Gamepad2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Header({ searchTerm, setSearchTerm, onHomeClick }) {
  return (
    <header className="sticky top-0 z-50 glass border-b border-white/5 py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onHomeClick}
        className="flex items-center gap-2 cursor-pointer group"
      >
        <div className="w-10 h-10 bg-neon-primary rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(0,242,255,0.4)] group-hover:scale-110 transition-transform">
          <Gamepad2 className="text-dark-bg" size={24} />
        </div>
        <h1 className="text-2xl font-display font-extrabold tracking-tighter bg-gradient-to-r from-neon-primary to-neon-secondary bg-clip-text text-transparent italic">
          GAMEZONE
        </h1>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md group"
      >
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-white/40 group-focus-within:text-neon-primary transition-colors">
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder="Search unblocked games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-dark-bg/50 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-neon-primary focus:ring-1 focus:ring-neon-primary transition-all placeholder:text-white/20"
        />
      </motion.div>
    </header>
  );
}
