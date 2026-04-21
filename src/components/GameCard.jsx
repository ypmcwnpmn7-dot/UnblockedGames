import { Play } from 'lucide-react';
import { motion } from 'motion/react';

export default function GameCard({ game, onClick, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      onClick={() => onClick(game)}
      className="group cursor-pointer bg-dark-surface rounded-xl overflow-hidden neon-border block"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={game.thumbnail}
          alt={game.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-dark-bg/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
          <div className="w-14 h-14 bg-neon-primary rounded-full flex items-center justify-center text-dark-bg transition-transform group-hover:scale-110">
            <Play fill="currentColor" size={24} />
          </div>
        </div>
        <div className="absolute top-2 right-2 px-2 py-0.5 bg-dark-bg/80 text-[10px] font-bold text-neon-primary uppercase tracking-wider rounded border border-neon-primary/20 backdrop-blur-sm">
          {game.category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-display font-bold text-lg group-hover:text-neon-primary transition-colors italic">
          {game.title}
        </h3>
        <p className="text-sm text-white/50 line-clamp-1 mt-1 font-medium">
          {game.description}
        </p>
      </div>
    </motion.div>
  );
}
