interface CTFHeaderProps {
  timeLeft: number;
  flagsFound: number;
  totalFlags: number;
}

export function CTFHeader({ timeLeft, flagsFound, totalFlags }: CTFHeaderProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (flagsFound / totalFlags) * 100;

  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-lg mb-6">
      <div className="text-center mb-4">
        <h1 className="text-2xl mb-2">AWS CLOUD CLUB - PCU CAVITE</h1>
        <h2 className="text-4xl bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
          🥚 Reika's Domain Egg Hunt 🥚
        </h2>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="bg-black/20 px-4 py-2 rounded-full">
          <span className="text-xl">⏰ {formatTime(timeLeft)}</span>
        </div>
        <div className="bg-black/20 px-4 py-2 rounded-full">
          <span className="text-xl">🚩 {flagsFound}/{totalFlags}</span>
        </div>
      </div>
      
      <div className="w-full bg-black/20 rounded-full h-4">
        <div 
          className="bg-gradient-to-r from-green-400 to-blue-400 h-4 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}