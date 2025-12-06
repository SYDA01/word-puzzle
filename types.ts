export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  level: number;
  score: number;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Puzzle {
  id: number;
  level: number;
  title: string;
  category: string;
  difficulty: 1 | 2 | 3;
  gridSize: number;
  grid: GridCell[];
  clues: Clue[];
  letters: Letter[];
}

export interface GridCell {
  row: number;
  col: number;
  type: 'block' | 'letter' | 'empty';
  letter?: string; // The correct letter
  currentLetter?: string; // The user input
  clueId?: string;
  isClueStart?: boolean;
  clueNumber?: number;
}

export interface Clue {
  id: string;
  number: number;
  direction: 'across' | 'down';
  text: string;
  answer: string;
  length: number;
  row: number;
  col: number;
}

export interface Letter {
  char: string;
  count: number;
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  username: string;
  avatar: string;
  score: number;
  level: number;
  country: string;
  accuracy: number;
}
