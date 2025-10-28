import { useState, useEffect, useCallback } from 'react';
import { CTFHeader } from './components/CTFHeader';
import { Terminal } from './components/Terminal';
import { GameOverModal } from './components/GameOverModal';
import { Button } from './components/ui/button';
import { ImageOverlay } from './components/ImageOverlay';
const TOTAL_FLAGS = 5;
const GAME_DURATION =600; // 10 minutes in seconds

interface OverlayImage {
  url: string;
  title: string;
}

const OVERLAY_IMAGES: OverlayImage[] = [
];

interface Challenge {
  id: number;
  title: string;
  description: string;
  flag: string;
  hints: string[];
  completed: boolean;
   shownHintIndexes: number[];
}

const CHALLENGES: Challenge[] = [
  {
    id: 1,
    title: "Egg #1",
    description: "The console commands are essential for navigating and solving CTF and cybersecurity challenges.",
    flag: "CONSOLEEGG",
    hints: ["Pay attention to the commands listed when you type in help", "Have you tried the console commands yet?"],
    completed: false,
    shownHintIndexes: []  
  },
  {
    id: 2,
    title: "Egg #2",
    description: "Developers often use the tools available to them in the browser's available development tools.",
    flag: "PAGE_SOURCE",
    hints: ["This is a common browser feature that lets you view the basic source code", "Right-click on the webpage and look for an option"],
    completed: false,
    shownHintIndexes: [] 
  },
  {
    id: 3,
    title: "Egg #3",
    description: "A subdirectory is a basic necessity for identifying a website's content.",
    flag: "AWSCLOUDCLUBPCUCAVITE",
    hints: ["Have you checked our Facebook page?", "Look for a subdirectory in a specific URL", "The answer needs to be in upper case", "Spam the hint button if you need to"],
    completed: false,
    shownHintIndexes: [] 
  },
  {
    id: 4,
    title: "Egg #4",
    description: "Titles are used to tag and identify elements in a website.",
    flag: "I_LOVE_EGG_HUNTS",
    hints: ["Have you hovered over the elements within the website?", "Egg?"],
    completed: false,
    shownHintIndexes: []
  },
  {
    id: 5,
    title: "Egg #5",
    description: "Paths and subdirectories are essential for navigating a website's structure.",
    flag: "RAWR_XD",
    hints: ["Have you taken note of the strange set of numbers & letters from Egg #2?", "youtube.com/watch?"],
    completed: false,
    shownHintIndexes: []
  }
];

export default function App() {
  const [currentOverlay, setCurrentOverlay] = useState<OverlayImage | null>(null);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [challenges, setChallenges] = useState<Challenge[]>(CHALLENGES);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [_currentChallenge, setCurrentChallenge] = useState<number | null>(null);
  const [showTipsPopup, setShowTipsPopup] = useState(false);
  const flagsFound = challenges.filter(c => c.completed).length;
  const isWin = flagsFound === TOTAL_FLAGS;

  // Timer effect
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameOver]);

  // Check win condition
  useEffect(() => {
    if (flagsFound === TOTAL_FLAGS && gameStarted) {
      setGameOver(true);
    }
  }, [flagsFound, gameStarted]);

  // Initialize terminal
useEffect(() => {
  if (gameStarted && terminalOutput.length === 0) {
    setTerminalOutput([
      '<span style="color: #4ade80 !important">🥚 Welcome to Reika\'s Domain Egg Hunt! 🥚</span>',
      "",
      '<span style="color: #4ade80 !important">You have 10 minutes to find 5 eggs by solving domain-related challenges.</span>',
      "",
      '<span style="color: #4ade80 !important">Available commands:</span>',
      '<span style="color: #4379F2 !important">  help</span>         - <span style="color: #9ca3af !important">Show available commands</span>',
      '<span style="color: #4379F2 !important">  challenges</span>   - <span style="color: #9ca3af !important">List all challenges</span>',
      '<span style="color: #4379F2 !important">  challenge &lt;#&gt;</span>- <span style="color: #9ca3af !important">View challenge details</span>',
      '<span style="color: #4379F2 !important">  submit &lt;EGG&gt;</span> - <span style="color: #9ca3af !important">Submit an egg</span>',
      '<span style="color: #4379F2 !important">  hint &lt;#&gt;</span>     - <span style="color: #9ca3af !important">Get a hint for challenge n</span>',
      '<span style="color: #4379F2 !important">  clear</span>        - <span style="color: #9ca3af !important">Clear terminal</span>',
      "",
      '<span style="color: #4ade80 !important">Good luck, awrca! 🌊</span>',
      ""
    ]);
  }
}, [gameStarted, terminalOutput.length]);

  const addOutput = useCallback((lines: string | string[]) => {
    const newLines = Array.isArray(lines) ? lines : [lines];
    setTerminalOutput(prev => [...prev, ...newLines]);
  }, []);

  const handleCommand = useCallback((command: string) => {
  const [cmd, ...args] = command.toLowerCase().split(' ');
  const arg = args.join(' ');

  addOutput(`reika@ctf:~$ ${command}`);

  switch (cmd) {
    case 'help':
      addOutput([
        '',
        '<span style="color: #4ade80">  📋 AVAILABLE COMMANDS:</span>',
        '<span style="color: #4379F2">  help</span>         - <span style="color: #9ca3af">Show this help message</span>',
        '<span style="color: #4379F2">  challenges</span>   - <span style="color: #9ca3af">List all challenges</span>',
        '<span style="color: #4379F2">  challenge &lt;#&gt</span>- <span style="color: #9ca3af">View challenge details</span>',
        '<span style="color: #4379F2">  submit &lt;EGG&gt</span> - <span style="color: #9ca3af">Submit an egg</span>',
        '<span style="color: #4379F2">  hint &lt;#&gt</span>     - <span style="color: #9ca3af">Get a hint</span>',
        '<span style="color: #4379F2">  clear</span>        - <span style="color: #9ca3af">Clear terminal</span>',
        '<span style="color: #4379F2">  CONSOLEEGG</span>   - <span style="color: #9ca3af">Egg #1 >:3c </span>',
        ''
      ]);
      break;

    case 'challenges':
      addOutput([
        "",
        "🎯 CTF Challenges:",
        ""
      ]);
      challenges.forEach(challenge => {
        const status = challenge.completed ? "✅ SOLVED" : "🔓 UNSOLVED";
        addOutput(`${challenge.id}. ${challenge.title} - ${status}`);
      });
      addOutput("");
      break;

    case 'challenge':
      const challengeNum = parseInt(arg);
      if (challengeNum >= 1 && challengeNum <= 5) {
        const challenge = challenges[challengeNum - 1];
        setCurrentChallenge(challengeNum);
        addOutput([
          "",
          `🎯 Challenge ${challenge.id}: ${challenge.title}`,
          "",
          `Description: ${challenge.description}`,
          "",
          challenge.completed ? "✅ Status: SOLVED" : "🔓 Status: UNSOLVED",
          ""
        ]);
      } else {
        addOutput("❌ Invalid challenge number. Use 1-5.");
      }
      break;

    case 'submit':
      if (!arg) {
        addOutput("❌ Please provide an egg to submit.");
        break;
      }
      
      const flag = arg.toUpperCase();
      const matchingChallenge = challenges.find(c => c.flag === flag && !c.completed);
      
      if (matchingChallenge) {
        setChallenges(prev => prev.map(c => 
          c.id === matchingChallenge.id ? { ...c, completed: true } : c
        ));
        addOutput([
          "",
          "🎉 CORRECT! Egg accepted! 🎉",
          `✅ Challenge ${matchingChallenge.id} solved: ${matchingChallenge.title}`,
          `🏆 Progress: ${flagsFound + 1}/${TOTAL_FLAGS} eggs found`,
          ""
        ]);
      } else {
        addOutput([
          "",
          "❌ Incorrect egg or already submitted.",
          "💡 Tip: Eggs are in format submit {EGG_TEXT}",
          ""
        ]);
      }
      break;

    case 'hint':
  const hintNum = parseInt(arg);
  if (hintNum >= 1 && hintNum <= 5) {
    const challenge = challenges[hintNum - 1];
    
    if (challenge.completed) {
      addOutput(`💡 Challenge ${hintNum} is already solved!`);
    } else {
      const shownIndexes = challenge.shownHintIndexes || [];
      
      // Find unshown hints
      const unshownIndexes = challenge.hints
        .map((_, i) => i)
        .filter(i => !shownIndexes.includes(i));
      
      if (unshownIndexes.length > 0) {
        // Get the first unshown hint
        const nextIndex = unshownIndexes[0];
        
        // Update state to mark this hint as shown
        setChallenges(prev => prev.map((c, i) => 
          i === hintNum - 1 
            ? { ...c, shownHintIndexes: [...shownIndexes, nextIndex] }
            : c
        ));
        
        addOutput([
          "",
          `💡 Hint ${shownIndexes.length + 1}/${challenge.hints.length} for Challenge ${hintNum}:`,
          challenge.hints[nextIndex],
          ""
        ]);
      } else {
        addOutput(`💡 All hints have been shown for Challenge ${hintNum}!`);
      }
    }
  } else {
    addOutput("❌ Invalid challenge number. Use 1-5.");
  }
  break;

    case 'clear':
      setTerminalOutput([]);
      break;

    case 'ls':
      addOutput([
        "",
        "📁 Directory contents:",
        "challenges.txt    flags/    README.md",
        ""
      ]);
      break;

    case 'whoami':
      addOutput("reika - CTF participant");
      break;

    case 'pwd':
      addOutput("/home/reika/ctf");
      break;

    default:
      addOutput([
        `❌ Command not found: ${cmd}`,
        "💡 Type 'help' for available commands.",
        ""
      ]);
      break;
  }
}, [challenges, flagsFound, addOutput, setChallenges, setCurrentChallenge, setTerminalOutput]);

  function startGame() {
    setGameStarted(true);
    setGameOver(false);
  }

  const restartGame = () => {
    setTimeLeft(GAME_DURATION);
    setChallenges(CHALLENGES.map(c => ({ ...c, completed: false })));
    setGameStarted(false);
    setGameOver(false);
    setTerminalOutput([]);
    setCurrentChallenge(null);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <img src="/AWSCCPCUFoundationDay/borderUp.png" width="400" height="20" style={{ display: "block", margin: "0 auto" }}/>
          <img src="/AWSCCPCUFoundationDay/awscc-pcu.png" width="500" height="20" style={{ display: "block", margin: "0 auto" }}/>
          <img src="/AWSCCPCUFoundationDay/title.pnh.png" width="400" height="20" style={{ display: "block", margin: "0 auto" }}/>
          <img src="/AWSCCPCUFoundationDay/borderDown.png" width="500" height="20" style={{ display: "block", margin: "0 auto" }}/>
          <h1 className="text-2xl mb-2 text-white"></h1>
          <h2 className="text-4xl mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          </h2>
          
          <div className="mb-6 space-y-4 text-left text-gray-300">
            <div className=" p-4 rounded-lg">
             <img src="/AWSCCPCUFoundationDay/mission.png" width="500" height="100" style={{ display: "block", margin: "0 auto" }}/>
              <h3 className="text-lg mb-2 text-blue-400"></h3>
            </div>
            
            <div className="p-4 rounded-lg">
            <img src="/AWSCCPCUFoundationDay/timelimit.png" width="400" height="100" style={{ display: "block", margin: "0 auto" }}/>
            </div>
            
            <div className="p-4 rounded-lg">
              <img src="/AWSCCPCUFoundationDay/howtoplay.png" width="600" height="100" style={{ display: "block", margin: "0 auto" }}/>
            </div>
          </div>
          
          <div className='space-y-4'>
            <div className='flex gap-4 justify-center'>
              {OVERLAY_IMAGES.map((image, index) => (
                <Button
                  key={index}
                  onClick={() => setCurrentOverlay(image)}
                  className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-2'
                >
                  📚 View Guide {index + 1}
                </Button>
              ))}
            </div>
            <Button
              onClick={startGame}
              className="transition-transform duration-300 ease-in-out, opacity 0.3s ease-in-out; hover:scale-110"
              >
              <img src="/AWSCCPCUFoundationDay/buttonStatic.png" alt="Start Game" width="300" height="100" onMouseOver={() => {
                const img = document.querySelector('img[alt="Start Game"]');
                if (img) {
                  (img as HTMLImageElement).src = '/AWSCCPCUFoundationDay/buttonActive.png';
                }
              }} onMouseOut={() => {
                const img = document.querySelector('img[alt="Start Game"]');
                if (img) {
                  (img as HTMLImageElement).src = '/AWSCCPCUFoundationDay/buttonStatic.png';
                }
              }} />

            </Button>
          </div>
          {currentOverlay && (
            <ImageOverlay
              imageUrl={currentOverlay.url}
              title={currentOverlay.title}
              onClose={() => setCurrentOverlay(null)}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen to-black p-4">
      <div className="max-w-6xl mx-auto">
        <CTFHeader 
          timeLeft={timeLeft}
          flagsFound={flagsFound}
          totalFlags={TOTAL_FLAGS}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Terminal 
              onCommand={handleCommand}
              output={terminalOutput}
              isGameActive={!gameOver}
            />
          </div>
          
          <div className="space-y-4">

            {/* Popup Trigger */}
            <Button 
              onClick={() => setShowTipsPopup(true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
            >
              💡 Show Quick Tips
            </Button>
            
            {/* Progress Box */}
            <div className="bg-gray-800 border border-blue-500/30 rounded-lg p-4">
              <h3 className="text-blue-400 mb-3">📊 Progress</h3>
              <div className="space-y-2">
                {challenges.map(challenge => (
                  <div key={challenge.id} className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">{challenge.title}</span>
                    <span className={challenge.completed ? "text-green-400" : "text-gray-500"}>
                      {challenge.completed ? "✅" : "⏳"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      <footer className="mt-8 pt-6 border-t border-gray-700">
        <div className="text-center text-gray-400 space-y-2">
          <p className="text-sm">
            Made with 💙 by AWS Cloud Club PCU Cavite
          </p>
           <p className="text-xs text-gray-500">
           gmdb22 • BNANMN • altdespiritu
            </p>
          <p className="text-xs text-gray-500">
            © 2025 Foundation Day Egg Hunt Challenge
          </p>
          
        </div>
      </footer>
    </div>
      
      {/* Game Over Modal */}
      {gameOver && (
        <GameOverModal
          isWin={isWin}
          eggsCollected={flagsFound}
          totalEggs={TOTAL_FLAGS}
          timeLeft={timeLeft}
          onRestart={restartGame}
        />
      )}

      {showTipsPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm p-4">
          <div className="relative max-w-lg w-full">
            
            {/* Close Button */}
            <button
              onClick={() => setShowTipsPopup(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-3xl font-bold p-1 leading-none z-10"
              aria-label="Close"
            >
              &times;
            </button>

            {/* Quick Tips Content */}
            <div className="bg-gray-800 border border-green-500/30 rounded-lg p-6 relative">
              <h3 className="text-green-400 text-2xl font-bold mb-4">💡 Quick Tips</h3>
              
              <ul className="text-base text-gray-300 space-y-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Type **'challenges'** to see all tasks
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Use **'hint N'** for challenge hints
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  **Eggs** need to be **upper case**
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Don't be shy to use the **hint button** over and over again
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}