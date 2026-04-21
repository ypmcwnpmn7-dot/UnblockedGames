import { ArrowLeft, Maximize2, RefreshCw, X } from 'lucide-react';
import { motion } from 'motion/react';

export default function GamePlayer({ game, onClose }) {
  const refreshGame = () => {
    const iframe = document.getElementById('game-iframe');
    if (iframe) iframe.src = iframe.src;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-dark-bg flex flex-col"
    >
      <header className="h-16 glass border-b border-white/5 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors text-white/60 hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="font-display font-bold text-lg leading-tight uppercase tracking-tight italic">
              {game.title}
            </h2>
            <p className="text-[10px] text-neon-primary font-mono uppercase tracking-widest font-bold">
              Playing Now
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={refreshGame}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors text-white/60 hover:text-white"
            title="Refresh game"
          >
            <RefreshCw size={18} />
          </button>
          <button 
            onClick={() => {
              const elem = document.getElementById('game-iframe');
              if (elem?.requestFullscreen) elem.requestFullscreen();
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors text-white/60 hover:text-white"
            title="Fullscreen"
          >
            <Maximize2 size={18} />
          </button>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-500/20 transition-colors text-white/60 hover:text-red-500 ml-2"
          >
            <X size={20} />
          </button>
        </div>
      </header>

      <div className="flex-1 bg-black relative">
        <iframe
          id="game-iframe"
          src={game.iframeUrl}
          className="w-full h-full border-none shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          title={game.title}
          allow="autoplay; fullscreen; keyboard"
          sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts allow-same-origin"
        />
      </div>
      
      <footer className="h-10 bg-dark-surface border-t border-white/5 flex items-center justify-center px-4">
        <p className="text-[10px] text-white/30 font-mono tracking-widest uppercase">
          GameZone • Powered by HTML5 • Press ESC to exit Fullscreen
        </p>
      </footer>
    </motion.div>
  );
}
