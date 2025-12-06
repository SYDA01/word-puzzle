import React, { useState, useEffect } from 'react';
import { Puzzle, GridCell, Clue, Letter } from '../types';
import { geminiService } from '../services/geminiService';

const MOCK_PUZZLE: Puzzle = {
  id: 1,
  level: 1,
  title: "First Steps",
  category: "General",
  difficulty: 1,
  gridSize: 10,
  grid: Array.from({ length: 100 }, (_, i) => {
    const row = Math.floor(i / 10);
    const col = i % 10;
    // Simple mock layout: Two words crossing
    // Across: "REACT" at (2,2)
    // Down: "CODE" at (1,4) -> C intersects with C in REACT (2,4)
    if (row === 2 && col >= 2 && col <= 6) return { row, col, type: 'letter', letter: "REACT"[col-2], clueId: 'a1', isClueStart: col===2, clueNumber: 1 };
    if (col === 4 && row >= 1 && row <= 4) return { row, col, type: 'letter', letter: "CODE"[row-1], clueId: 'd1', isClueStart: row===1, clueNumber: 2 };
    return { row, col, type: 'empty' };
  }),
  clues: [
    { id: 'a1', number: 1, direction: 'across', text: 'A popular JavaScript library for building UI', answer: 'REACT', length: 5, row: 2, col: 2 },
    { id: 'd1', number: 2, direction: 'down', text: 'Programmers write this', answer: 'CODE', length: 4, row: 1, col: 4 },
  ],
  letters: [
    { char: 'R', count: 1 }, { char: 'E', count: 2 }, { char: 'A', count: 1 }, { char: 'C', count: 2 }, { char: 'T', count: 1 }, { char: 'O', count: 1 }, { char: 'D', count: 1 }
  ]
};

const Game: React.FC = () => {
  const [grid, setGrid] = useState<GridCell[]>(MOCK_PUZZLE.grid);
  const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
  const [score, setScore] = useState(1000);
  const [timeLeft, setTimeLeft] = useState(1800);
  const [aiHintLoading, setAiHintLoading] = useState(false);
  const [currentHint, setCurrentHint] = useState<string | null>(null);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCellClick = (row: number, col: number) => {
    const cell = grid.find(c => c.row === row && c.col === col);
    if (cell && cell.type === 'letter') {
      setSelectedCell({ row, col });
      setCurrentHint(null);
    }
  };

  const handleLetterInput = (char: string) => {
    if (!selectedCell) return;
    
    // Update grid with new letter
    const newGrid = grid.map(cell => {
      if (cell.row === selectedCell.row && cell.col === selectedCell.col) {
        // Check correctness immediate for this demo
        const isCorrect = char === cell.letter;
        if (isCorrect) setScore(s => s + 10);
        else setScore(s => Math.max(0, s - 5));
        
        return { ...cell, currentLetter: char };
      }
      return cell;
    });
    
    setGrid(newGrid);
    
    // Check win condition
    const allFilledCorrect = newGrid
      .filter(c => c.type === 'letter')
      .every(c => c.currentLetter === c.letter);
      
    if (allFilledCorrect) {
      setGameWon(true);
    }
  };

  const getActiveClue = () => {
    if (!selectedCell) return null;
    const cell = grid.find(c => c.row === selectedCell.row && c.col === selectedCell.col);
    if (!cell || !cell.clueId) return null;
    return MOCK_PUZZLE.clues.find(c => c.id === cell.clueId);
  };

  const handleAiHint = async () => {
    const clue = getActiveClue();
    if (!clue) return;

    setAiHintLoading(true);
    // Construct current pattern (e.g., "R _ A _ T")
    const pattern = clue.answer.split('').map((char, i) => {
        // In a real app we'd map this properly to grid cells based on direction
        return '_'; 
    }).join(' ');

    const hint = await geminiService.getHint(clue.text, pattern);
    setCurrentHint(hint);
    setAiHintLoading(false);
    setScore(s => Math.max(0, s - 50)); // Cost for AI hint
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {gameWon && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-10 text-center max-w-md shadow-2xl animate-[slideUp_0.5s_ease-out]">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-dark mb-2">Level Complete!</h2>
            <p className="text-gray-600 mb-6">You solved the puzzle with a score of {score}.</p>
            <button 
              onClick={() => setGameWon(false)}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold transition-colors w-full"
            >
              Next Level
            </button>
          </div>
        </div>
      )}

      {/* Header Stats */}
      <div className="flex flex-wrap items-center justify-between mb-8 bg-white p-4 rounded-xl shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-dark">Level 1: <span className="text-primary">First Steps</span></h1>
          <div className="text-sm text-gray-500">General Knowledge • Easy</div>
        </div>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
             <div className="text-xs text-blue-500 uppercase font-bold">Time</div>
             <div className="font-mono text-xl font-bold text-blue-700">{formatTime(timeLeft)}</div>
          </div>
          <div className="bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-100">
             <div className="text-xs text-yellow-600 uppercase font-bold">Score</div>
             <div className="font-mono text-xl font-bold text-yellow-700">{score}</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Game Grid */}
        <div className="lg:col-span-2">
          <div className="bg-dark p-4 rounded-xl shadow-lg aspect-square max-w-2xl mx-auto overflow-hidden">
             <div 
               className="grid gap-1 h-full w-full"
               style={{ gridTemplateColumns: `repeat(${MOCK_PUZZLE.gridSize}, 1fr)` }}
             >
                {grid.map((cell, idx) => (
                  <div 
                    key={idx}
                    onClick={() => handleCellClick(cell.row, cell.col)}
                    className={`
                      relative aspect-square flex items-center justify-center text-lg sm:text-2xl font-bold select-none transition-all duration-200
                      ${cell.type === 'empty' ? 'bg-slate-700/50 rounded-sm' : 'cursor-pointer rounded-md'}
                      ${cell.type === 'letter' ? 'bg-white text-dark hover:scale-105' : ''}
                      ${selectedCell?.row === cell.row && selectedCell?.col === cell.col ? 'ring-4 ring-secondary z-10' : ''}
                      ${cell.currentLetter === cell.letter ? 'text-success' : 'text-dark'}
                    `}
                  >
                    {cell.isClueStart && (
                      <span className="absolute top-0.5 left-1 text-[8px] sm:text-[10px] text-gray-400 leading-none">
                        {cell.clueNumber}
                      </span>
                    )}
                    {cell.currentLetter}
                  </div>
                ))}
             </div>
          </div>

          {/* Letter Bank / Keyboard */}
          <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">
             <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">Letter Bank</h3>
             <div className="flex flex-wrap gap-2 justify-center">
                {['R','E','A','C','T','O','D', 'X', 'Y', 'Z'].map((char, i) => (
                  <button
                    key={i}
                    onClick={() => handleLetterInput(char)}
                    className="w-10 h-12 sm:w-12 sm:h-14 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-dark font-bold rounded-lg shadow-sm border-b-4 border-gray-300 active:border-b-0 active:translate-y-1 transition-all"
                  >
                    {char}
                  </button>
                ))}
                <button 
                  onClick={() => {
                     if(selectedCell) {
                        const newGrid = [...grid];
                        const idx = newGrid.findIndex(c => c.row === selectedCell.row && c.col === selectedCell.col);
                        if(idx !== -1) {
                           newGrid[idx].currentLetter = undefined;
                           setGrid(newGrid);
                        }
                     }
                  }}
                  className="w-16 h-12 sm:w-20 sm:h-14 bg-red-100 hover:bg-red-200 text-red-600 font-bold rounded-lg shadow-sm border-b-4 border-red-200 flex items-center justify-center"
                >
                  <i className="fa-solid fa-delete-left"></i>
                </button>
             </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Active Clue Card */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-primary">
            <h3 className="text-xs font-bold text-primary uppercase mb-2">Active Clue</h3>
            {getActiveClue() ? (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                    {getActiveClue()?.number}
                  </span>
                  <span className="text-sm text-gray-500 uppercase font-bold">{getActiveClue()?.direction}</span>
                </div>
                <p className="text-lg font-medium text-dark">{getActiveClue()?.text}</p>
                <div className="mt-4 flex gap-2">
                   {Array.from({ length: getActiveClue()?.length || 0 }).map((_, i) => (
                     <div key={i} className="w-8 h-8 border-b-2 border-gray-300"></div>
                   ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-400 italic">Select a cell to see the clue</p>
            )}
          </div>

          {/* AI Hint */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl shadow-sm border border-indigo-100">
             <div className="flex items-center justify-between mb-3">
               <h3 className="font-bold text-indigo-900"><i className="fa-solid fa-wand-magic-sparkles mr-2 text-indigo-500"></i>AI Hint</h3>
               <span className="text-xs bg-indigo-200 text-indigo-800 px-2 py-1 rounded-full font-bold">-50 pts</span>
             </div>
             
             {currentHint ? (
               <div className="bg-white p-4 rounded-lg text-indigo-800 text-sm italic border-l-2 border-indigo-400 animate-[fadeIn_0.5s]">
                 "{currentHint}"
               </div>
             ) : (
               <p className="text-sm text-indigo-700/70 mb-4">Stuck on a tricky word? Let Gemini AI give you a clever nudge.</p>
             )}

             <button 
               onClick={handleAiHint}
               disabled={!selectedCell || aiHintLoading}
               className={`w-full py-2 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2
                 ${!selectedCell ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-500/30'}
               `}
             >
               {aiHintLoading ? (
                 <><i className="fa-solid fa-circle-notch fa-spin"></i> Thinking...</>
               ) : (
                 <><i className="fa-regular fa-lightbulb"></i> Ask AI Hint</>
               )}
             </button>
          </div>

          {/* Clues List */}
          <div className="bg-white rounded-xl shadow-sm flex-1 overflow-hidden flex flex-col max-h-[400px]">
             <div className="p-4 border-b bg-gray-50">
               <h3 className="font-bold text-dark">All Clues</h3>
             </div>
             <div className="overflow-y-auto p-2 space-y-2">
               {MOCK_PUZZLE.clues.map(clue => (
                 <div 
                   key={clue.id}
                   onClick={() => {
                      const cell = grid.find(c => c.clueId === clue.id && c.isClueStart);
                      if(cell) handleCellClick(cell.row, cell.col);
                   }}
                   className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 flex gap-3 ${
                     getActiveClue()?.id === clue.id ? 'bg-blue-50 border border-blue-100' : ''
                   }`}
                 >
                   <span className="font-bold text-primary">{clue.number}</span>
                   <div>
                     <div className="text-xs text-gray-400 font-bold uppercase">{clue.direction}</div>
                     <div className="text-sm text-gray-700 line-clamp-2">{clue.text}</div>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;