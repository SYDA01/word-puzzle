import React from 'react';
import { User } from '../types';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ProfileProps {
  user: User;
}

const activityData = [
  { day: 'M', score: 400 },
  { day: 'T', score: 300 },
  { day: 'W', score: 550 },
  { day: 'T', score: 450 },
  { day: 'F', score: 600 },
  { day: 'S', score: 800 },
  { day: 'S', score: 750 },
];

const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center border border-gray-100">
            <div className="relative inline-block mb-4">
              <img src={user.avatar} alt={user.username} className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover" />
              <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-md hover:bg-primary-dark transition-colors">
                <i className="fa-solid fa-camera"></i>
              </button>
            </div>
            <h2 className="text-2xl font-bold text-dark">{user.username}</h2>
            <p className="text-gray-500 text-sm mb-6">{user.email}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-primary">{user.level}</div>
                <div className="text-xs text-gray-500 uppercase font-bold">Level</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-secondary">{user.score}</div>
                <div className="text-xs text-gray-500 uppercase font-bold">Score</div>
              </div>
            </div>

            <div className="border-t pt-6 text-left">
              <h3 className="font-bold text-gray-400 text-xs uppercase mb-3">Settings</h3>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 flex items-center justify-between group transition-colors">
                <span className="text-gray-700 font-medium group-hover:text-primary"><i className="fa-solid fa-user mr-3"></i> Edit Profile</span>
                <i className="fa-solid fa-chevron-right text-gray-300"></i>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 flex items-center justify-between group transition-colors">
                <span className="text-gray-700 font-medium group-hover:text-primary"><i className="fa-solid fa-bell mr-3"></i> Notifications</span>
                <i className="fa-solid fa-chevron-right text-gray-300"></i>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 flex items-center justify-between group transition-colors">
                <span className="text-gray-700 font-medium group-hover:text-primary"><i className="fa-solid fa-shield mr-3"></i> Security</span>
                <i className="fa-solid fa-chevron-right text-gray-300"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-2/3 flex flex-col gap-8">
          {/* Activity Chart */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h3 className="font-bold text-lg mb-6">Weekly Activity</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4a6fa5" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4a6fa5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="score" stroke="#4a6fa5" fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">Achievements</h3>
              <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">3/12 Unlocked</span>
            </div>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
               {[
                 { title: "First Win", desc: "Solve 1st puzzle", icon: "🏆", locked: false },
                 { title: "Speedster", desc: "Solve under 5m", icon: "⚡", locked: false },
                 { title: "Smarty", desc: "Use 0 hints", icon: "🧠", locked: false },
                 { title: "Marathon", desc: "Solve 50 puzzles", icon: "🏃", locked: true },
                 { title: "Social", desc: "Share result", icon: "🔗", locked: true },
                 { title: "Master", desc: "Rank #1", icon: "👑", locked: true },
               ].map((ach, i) => (
                 <div key={i} className={`p-4 rounded-xl border ${ach.locked ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-yellow-50 border-yellow-100'} text-center`}>
                    <div className="text-3xl mb-2 grayscale-{ach.locked ? '100' : '0'}">{ach.icon}</div>
                    <div className="font-bold text-dark text-sm">{ach.title}</div>
                    <div className="text-xs text-gray-500">{ach.desc}</div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;