import { useState, useEffect, useRef } from 'react';

interface TerminalProps {
  onCommand: (command: string) => void;
  output: string[];
  isGameActive: boolean;
}

export function Terminal({ onCommand, output, isGameActive }: TerminalProps) {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    if (inputRef.current && isGameActive) {
      inputRef.current.focus();
    }
  }, [isGameActive]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && isGameActive) {
      onCommand(input.trim());
      setCommandHistory(prev => [...prev, input.trim()]);
      setHistoryIndex(-1);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : -1;
        setHistoryIndex(newIndex);
        setInput(newIndex === -1 ? '' : commandHistory[newIndex]);
      }
    }
  };

  return (
    <div className="bg-black text-green-400 font-mono text-sm rounded-lg overflow-hidden shadow-2xl border-2 border-green-500/30">
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-green-500/30">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-green-400 text-xs">Reika's Domain CTF Terminal v0.67</div>
      </div>
      
      <div 
        ref={outputRef}
        className="h-96 overflow-y-auto p-4 space-y-1"
      >
        {output.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
      </div>
      
      {isGameActive && (
        <div className="border-t border-green-500/30 p-4">
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="text-green-400 mr-2">reika@ctf:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-green-400 placeholder-green-600"
              placeholder="Enter command..."
              autoComplete="off"
            />
          </form>
        </div>
      )}
    </div>
  );
}