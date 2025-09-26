interface GameHeaderProps {
  timeLeft: number;
  eggsCollected: number;
  totalEggs: number;
}

export function GameHeader({ timeLeft, eggsCollected, totalEggs }: GameHeaderProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (eggsCollected / totalEggs) * 100;

  return (
    <div className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-lg shadow-lg mb-6">
      <div className="text-center mb-4">
        <h1 className="text-2xl mb-2">AWS Cloud Club</h1>
        <h2 className="text-4xl bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
          🥚 Reika's Egg Hunt 🥚
        </h2>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="bg-black/20 px-4 py-2 rounded-full">
          <span className="text-xl">⏰ {formatTime(timeLeft)}</span>
        </div>
        <div className="bg-black/20 px-4 py-2 rounded-full">
          <span className="text-xl">🥚 {eggsCollected}/{totalEggs}</span>
        </div>
      </div>
      
      <div className="w-full bg-black/20 rounded-full h-4">
        <div 
          className="bg-gradient-to-r from-yellow-400 to-orange-400 h-4 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}