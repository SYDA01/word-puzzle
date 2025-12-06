import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface HomeProps {
  onPlay: () => void;
}

const data = [
  { name: 'Mon', players: 1200 },
  { name: 'Tue', players: 1900 },
  { name: 'Wed', players: 1500 },
  { name: 'Thu', players: 2100 },
  { name: 'Fri', players: 2800 },
  { name: 'Sat', players: 3500 },
  { name: 'Sun', players: 4200 },
];

const Home: React.FC<HomeProps> = ({ onPlay }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-slate-800 text-white py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="grid grid-cols-12 gap-4 h-full">
             {Array.from({length: 48}).map((_, i) => (
               <div key={i} className="border border-white/20 aspect-square flex items-center justify-center text-4xl font-bold">
                 {String.fromCharCode(65 + Math.floor(Math.random() * 26))}
               </div>
             ))}
           </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Challenge Your <span className="text-secondary">Mind</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto lg:mx-0">
                Dive into the ultimate crossword experience. Solve daily puzzles, climb the leaderboard, and train your brain with AI-powered hints.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={onPlay}
                  className="bg-secondary hover:bg-orange-500 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-play"></i> Play Now
                </button>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all flex items-center justify-center gap-2">
                  <i className="fa-solid fa-users"></i> Community
                </button>
              </div>
              
              <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-blue-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">50+</div>
                  <div className="text-sm">Levels</div>
                </div>
                <div className="h-8 w-px bg-white/20"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">10k+</div>
                  <div className="text-sm">Players</div>
                </div>
                <div className="h-8 w-px bg-white/20"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">4.9</div>
                  <div className="text-sm">Rating</div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg"><i className="fa-solid fa-chart-line mr-2"></i>Live Activity</h3>
                  <div className="flex items-center gap-2 text-sm text-green-400">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    Online
                  </div>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="colorPlayers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ff9a3c" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#ff9a3c" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" tick={{fill: '#fff'}} />
                      <YAxis stroke="rgba(255,255,255,0.5)" tick={{fill: '#fff'}} />
                      <Tooltip 
                        contentStyle={{backgroundColor: '#2c3e50', border: 'none', borderRadius: '8px', color: '#fff'}}
                      />
                      <Area type="monotone" dataKey="players" stroke="#ff9a3c" fillOpacity={1} fill="url(#colorPlayers)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark mb-4">Why Play Crostic?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Discover features that make our crossword puzzles unique, engaging, and perfect for daily brain training.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: 'AI-Powered Hints', icon: 'fa-brain', desc: 'Stuck? Get smart, context-aware hints generated by Gemini AI that nudge you without spoiling the fun.', color: 'bg-purple-100 text-purple-600' },
              { title: 'Real-time Leaderboard', icon: 'fa-trophy', desc: 'Compete with friends and global players. Watch your rank climb as you solve puzzles faster.', color: 'bg-yellow-100 text-yellow-600' },
              { title: 'Responsive Design', icon: 'fa-mobile-screen', desc: 'Play seamlessly on any device. Whether on your phone commute or desktop at home.', color: 'bg-blue-100 text-blue-600' },
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow bg-white group">
                <div className={`w-16 h-16 rounded-xl ${f.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
                  <i className={`fa-solid ${f.icon}`}></i>
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;