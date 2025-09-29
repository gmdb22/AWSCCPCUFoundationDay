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
    <div className="bg-gradient-to-r from-black to-red-900 text-white p-6 rounded-lg shadow-lg mb-6">
      <img src="./public/images/banner.png" alt="Start Game" width="1500" title="Hover over the egg count, maybe? >:3c" height="200"/>
      
      <div className="text-center mb-4">
        <h1 className="text-2xl mb-2"></h1>
        <h2 className="text-4xl text-white text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073; bg-clip-text text-transparent">
        </h2>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="bg-black/20 px-4 py-2 rounded-full">
          <span className="text-xl"> <img src="./public/images/Stickers/reiklock.png" width="50px" height="50px" alt="Timer" title="Time Left" className="inline-block mr-1" /> {formatTime(timeLeft)}</span>
        </div>
        <div className="bg-black/20 px-4 py-2 rounded-full">
          <span className="text-xl"> 
          <img src="./public/images/Stickers/reikaBrown_egg.png" width="50px" height="50px" alt="Egg" title="I_LOVE_EGG_HUNTS" className="inline-block mr-1" /> {flagsFound}/{totalFlags} </span>
        </div>
      </div>
      
      <div className="w-full bg-black/20 rounded-full h-4">
        <div 
          className="bg-gradient-to-r from-black to-red-900 h-4 rounded-full transition-all duration-600"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}