import { Button } from "./ui/button";

interface GameOverModalProps {
  isWin: boolean;
  eggsCollected: number;
  totalEggs: number;
  timeLeft: number;
  onRestart: () => void;
}

export function GameOverModal({ isWin, eggsCollected, totalEggs, timeLeft, onRestart }: GameOverModalProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-r from-black to-red-900 rounded-lg p-8 max-w-md w-full mx-4 text-center shadow-2xl">
        <div className="text-6xl mb-4">
          {isWin ? '🎉' : '⏰'}
        </div>
        
        <h2 className="text-white text-3xl mb-4">
          {isWin ? 'Congratulations!' : 'Time\'s Up!'}
        </h2>
        
        <div className="mb-6 space-y-2">
          <p className="text-xl text-white">
            You collected <span className="text-orange-500">{eggsCollected}</span> out of <span className="text-orange-500">{totalEggs}</span> eggs!
          </p>
          {isWin && (
            <p className="text-green-600">
              🏆 Perfect! You found all eggs with {formatTime(timeLeft)} remaining!
            </p>
          )}
        </div>
        
        <div className="mb-6">
          <div className="flex justify-center space-x-2 mb-4">
            {Array.from({ length: totalEggs }, (_, i) => (
              <span key={i} className="text-3xl">
                {i < eggsCollected ? <img src='/images/Stickers/reikaGold_egg.png' alt={`Egg ${i + 1}`} /> : '⭕'}
              </span>
            ))}
          </div>
        </div>
        
        <Button 
          onClick={onRestart}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 text-lg"
        >
          🔄 Play Again
        </Button>
        
        {isWin && (
          <div className="mt-4 text-sm text-gray-600">
            <p></p>
          </div>
        )}
      </div>
    </div>
  );
}