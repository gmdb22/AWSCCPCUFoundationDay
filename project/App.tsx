import { useState, useEffect, useCallback } from 'react';
import { CTFHeader } from './components/CTFHeader';
import { Terminal } from './components/Terminal';
import { GameOverModal } from './components/GameOverModal';
import { Button } from './components/ui/button';

const TOTAL_FLAGS = 5;
const GAME_DURATION = 600; // 10 minutes in seconds

interface Challenge {
  id: number;
  title: string;
  description: string;
  flag: string;
  hints: string[];
  completed: boolean;
}

const CHALLENGES: Challenge[] = [
  {
    id: 1,
    title: "DNS Basics",
    description: "What DNS record type is used to point a domain to an IP address?",
    flag: "CTF{A_RECORD}",
    hints: ["Think about the most basic DNS record", "It maps hostnames to IPv4 addresses"],
    completed: false
  },
  {
    id: 2,
    title: "Subdomain Discovery",
    description: "You found a hidden subdomain: 'secret.example.com'. What's the flag format?",
    flag: "CTF{SUBDOMAIN_FOUND}",
    hints: ["Look for patterns in subdomain naming", "Sometimes secrets are hidden in plain sight"],
    completed: false
  },
  {
    id: 3,
    title: "Domain Registration",
    description: "What command-line tool can you use to query domain registration information?",
    flag: "CTF{WHOIS}",
    hints: ["It's a protocol and tool for querying databases", "Who is responsible for this domain?"],
    completed: false
  },
  {
    id: 4,
    title: "DNS Enumeration",
    description: "What DNS record type is used for mail servers?",
    flag: "CTF{MX_RECORD}",
    hints: ["Mail eXchange", "It specifies mail servers for a domain"],
    completed: false
  },
  {
    id: 5,
    title: "TLD Knowledge",
    description: "What does TLD stand for in domain terminology?",
    flag: "CTF{TOP_LEVEL_DOMAIN}",
    hints: ["It comes after the last dot", "Examples include .com, .org, .net"],
    completed: false
  }
];

export default function App() {
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [challenges, setChallenges] = useState<Challenge[]>(CHALLENGES);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [currentChallenge, setCurrentChallenge] = useState<number | null>(null);

  const flagsFound = challenges.filter(c => c.completed).length;
  const isWin = flagsFound === TOTAL_FLAGS;
  const isTimeUp = timeLeft <= 0;

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
        "🥚 Welcome to Reika's Domain Egg Hunt! 🥚",
        "",
        "You have 10 minutes to capture 5 flags by solving domain-related challenges.",
        "",
        "Available commands:",
        "  help          - Show this help message",
        "  challenges    - List all challenges",
        "  challenge <n> - View challenge details",
        "  submit <flag> - Submit a flag",
        "  hint <n>      - Get a hint for challenge n",
        "  clear         - Clear terminal",
        "",
        "Good luck, hacker! 🔥",
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
          "",
          "Available commands:",
          "  help          - Show this help message",
          "  challenges    - List all challenges",
          "  challenge <n> - View challenge details (1-5)",
          "  submit <flag> - Submit a flag in format CTF" + "{FLAG}",
          "  hint <n>      - Get a hint for challenge n",
          "  clear         - Clear terminal",
          ""
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
          addOutput("❌ Please provide a flag to submit.");
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
            "🎉 CORRECT! Flag accepted! 🎉",
            `✅ Challenge ${matchingChallenge.id} solved: ${matchingChallenge.title}`,
            `🏆 Progress: ${flagsFound + 1}/${TOTAL_FLAGS} flags found`,
            ""
          ]);
        } else {
          addOutput([
            "",
            "❌ Incorrect flag or already submitted.",
            "💡 Tip: Flags are in format CTF" + "{FLAG}",
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
            const randomHint = challenge.hints[Math.floor(Math.random() * challenge.hints.length)];
            addOutput([
              "",
              `💡 Hint for Challenge ${hintNum}:`,
              randomHint,
              ""
            ]);
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
          "challenges.txt    flags/    README.md",
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
  }, [challenges, flagsFound, addOutput]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
  };

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
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
        <div className="bg-gray-800 border border-green-500/30 rounded-lg p-8 max-w-2xl w-full text-center shadow-2xl">
          <h1 className="text-2xl mb-2 text-white">AWS CLOUD CLUB - PCU CAVITE</h1>
          <h2 className="text-4xl mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            🥚 Reika's Domain Egg Hunt 🥚
          </h2>
          
          <div className="mb-6 space-y-4 text-left text-gray-300">
            <div className="bg-blue-900/30 border border-blue-500/30 p-4 rounded-lg">
              <h3 className="text-lg mb-2 text-blue-400">🎯 Mission:</h3>
              <p>Solve {TOTAL_FLAGS} domain-related cybersecurity challenges to capture all flags!</p>
            </div>
            
            <div className="bg-purple-900/30 border border-purple-500/30 p-4 rounded-lg">
              <h3 className="text-lg mb-2 text-purple-400">⏰ Time Limit:</h3>
              <p>You have 10 minutes to complete all challenges</p>
            </div>
            
            <div className="bg-green-900/30 border border-green-500/30 p-4 rounded-lg">
              <h3 className="text-lg mb-2 text-green-400">💡 How to Play:</h3>
              <ul className="text-sm space-y-1">
                <li>• Use terminal commands to navigate challenges</li>
                <li>• Type 'help' for available commands</li>
                <li>• Submit flags in format: CTF{"{FLAG}"}</li>
                <li>• Get hints if you're stuck</li>
              </ul>
            </div>
          </div>
          
          <Button
            onClick={startGame}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 text-lg transition-all duration-200 transform hover:scale-105"
          >
            🚀 Start CTF
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
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
            
            <div className="bg-gray-800 border border-green-500/30 rounded-lg p-4">
              <h3 className="text-green-400 mb-3">💡 Quick Tips</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Type 'challenges' to see all tasks</li>
                <li>• Use 'hint N' for challenge hints</li>
                <li>• Flags are case sensitive</li>
                <li>• Think about DNS fundamentals</li>
              </ul>
            </div>
            
            <div className="bg-gray-800 border border-yellow-500/30 rounded-lg p-4">
              <h3 className="text-yellow-400 mb-3">🏆 Score</h3>
              <div className="text-center">
                <div className="text-2xl text-white">{flagsFound * 100}</div>
                <div className="text-sm text-gray-400">points</div>
              </div>
            </div>
          </div>
        </div>
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
    </div>
  );
}