import React from 'react';
import { LeaderboardEntry } from '../types';

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { id: '1', rank: 1, username: 'Alex Master', avatar: 'https://picsum.photos/seed/alex/50', score: 9850, level: 50, country: 'Indonesia', accuracy: 98 },
  { id: '2', rank: 2, username: 'Sarah Solver', avatar: 'https://picsum.photos/seed/sarah/50', score: 9200, level: 48, country: 'USA', accuracy: 95 },
  { id: '3', rank: 3, username: 'Ken Logic', avatar: 'https://picsum.photos/seed/ken/50', score: 8950, level: 45, country: 'Japan', accuracy: 96 },
  { id: '4', rank: 4, username: 'Maria Words', avatar: 'https://picsum.photos/seed/maria/50', score: 8100, level: 41, country: 'Spain', accuracy: 92 },
  { id: '5', rank: 5, username: 'John Doe', avatar: 'https://picsum.photos/seed/john/50', score: 7500, level: 38, country: 'UK', accuracy: 89 },
];

const Leaderboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-dark mb-4">🏆 Leaderboard</h1>
        <p className="text-gray-500">Compete with top solvers from around the world.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-12">
        {/* Top 3 Podium */}
        {[
          { pos: 2, data: MOCK_LEADERBOARD[1], color: 'border-slate-300', bg: 'bg-slate-50', icon: '🥈' },
          { pos: 1, data: MOCK_LEADERBOARD[0], color: 'border-yellow-400', bg: 'bg-yellow-50', icon: '👑', scale: 'scale-110 z-10' },
          { pos: 3, data: MOCK_LEADERBOARD[2], color: 'border-orange-300', bg: 'bg-orange-50', icon: '🥉' },
        ].map((item) => (
          <div key={item.pos} className={`relative bg-white rounded-2xl p-6 shadow-xl border-t-4 ${item.color} ${item.scale || ''} transform transition-transform hover:-translate-y-2`}>
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-4xl">
              {item.icon}
            </div>
            <div className="mt-6 text-center">
              <img src={item.data.avatar} className="w-20 h-20 rounded-full mx-auto border-4 border-white shadow-md mb-3 object-cover" />
              <div className="font-bold text-xl text-dark">{item.data.username}</div>
              <div className="text-primary font-bold">{item.data.score.toLocaleString()} pts</div>
              <div className="text-xs text-gray-500 mt-2 bg-gray-100 inline-block px-3 py-1 rounded-full">Level {item.data.level}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
          <h2 className="font-bold text-lg">Global Rankings</h2>
          <select className="border-gray-200 rounded-lg text-sm p-2 bg-white">
            <option>All Time</option>
            <option>This Week</option>
            <option>Today</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-4 text-center">Rank</th>
                <th className="px-6 py-4 text-left">Player</th>
                <th className="px-6 py-4 text-center">Level</th>
                <th className="px-6 py-4 text-center">Accuracy</th>
                <th className="px-6 py-4 text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_LEADERBOARD.map((entry) => (
                <tr key={entry.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="px-6 py-4 text-center font-bold text-gray-400">#{entry.rank}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={entry.avatar} className="w-10 h-10 rounded-full" />
                      <div>
                        <div className="font-bold text-dark">{entry.username}</div>
                        <div className="text-xs text-gray-400">{entry.country}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">{entry.level}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mx-auto overflow-hidden">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${entry.accuracy}%` }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{entry.accuracy}%</div>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-primary">{entry.score.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;