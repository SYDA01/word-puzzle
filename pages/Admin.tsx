import React from 'react';

const Admin: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <div className="w-64 bg-dark text-white hidden md:block fixed h-full z-10">
         <div className="p-6 border-b border-white/10">
           <h2 className="text-xl font-bold">Admin Panel</h2>
         </div>
         <nav className="p-4 space-y-2">
            <a href="#" className="block px-4 py-3 rounded-lg bg-primary text-white"><i className="fa-solid fa-chart-pie w-6"></i> Dashboard</a>
            <a href="#" className="block px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors"><i className="fa-solid fa-users w-6"></i> Users</a>
            <a href="#" className="block px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors"><i className="fa-solid fa-puzzle-piece w-6"></i> Puzzles</a>
            <a href="#" className="block px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors"><i className="fa-solid fa-gear w-6"></i> Settings</a>
         </nav>
      </div>
      
      {/* Content */}
      <div className="flex-1 md:ml-64 p-8">
         <h1 className="text-3xl font-bold text-dark mb-8">Dashboard Overview</h1>
         
         {/* Stats Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
               { label: 'Total Users', val: '15,234', icon: 'fa-users', color: 'bg-blue-500' },
               { label: 'Games Played', val: '124k', icon: 'fa-gamepad', color: 'bg-green-500' },
               { label: 'Revenue', val: '$12.5k', icon: 'fa-dollar-sign', color: 'bg-yellow-500' },
               { label: 'Server Status', val: 'Online', icon: 'fa-server', color: 'bg-purple-500' },
            ].map((s, i) => (
               <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                  <div>
                     <div className="text-sm text-gray-500 font-bold uppercase">{s.label}</div>
                     <div className="text-3xl font-bold text-dark mt-1">{s.val}</div>
                  </div>
                  <div className={`w-12 h-12 ${s.color} rounded-lg flex items-center justify-center text-white text-xl shadow-lg shadow-gray-200`}>
                     <i className={`fa-solid ${s.icon}`}></i>
                  </div>
               </div>
            ))}
         </div>
         
         <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
               <h3 className="font-bold text-lg mb-6">Recent Activity</h3>
               <div className="space-y-4">
                  {[1,2,3,4,5].map(i => (
                     <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-50 last:border-0">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">U{i}</div>
                        <div className="flex-1">
                           <div className="font-medium text-dark">User_{i} completed Level 5</div>
                           <div className="text-xs text-gray-400">2 minutes ago</div>
                        </div>
                        <span className="text-sm font-bold text-green-500">+1000 pts</span>
                     </div>
                  ))}
               </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
               <h3 className="font-bold text-lg mb-6">Quick Actions</h3>
               <div className="space-y-3">
                  <button className="w-full py-3 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors text-left flex items-center justify-between group">
                     <span>Add New Puzzle</span>
                     <i className="fa-solid fa-plus group-hover:rotate-90 transition-transform"></i>
                  </button>
                  <button className="w-full py-3 px-4 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors text-left text-gray-600">
                     Manage Users
                  </button>
                  <button className="w-full py-3 px-4 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors text-left text-gray-600">
                     System Logs
                  </button>
                  <button className="w-full py-3 px-4 border border-red-200 text-red-500 rounded-lg font-medium hover:bg-red-50 transition-colors text-left">
                     Maintenance Mode
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Admin;