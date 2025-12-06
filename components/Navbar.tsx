import React from 'react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onNavigate: (page: string) => void;
  currentPage: string;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onNavigate, currentPage, onLogout }) => {
  return (
    <nav className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="bg-white/20 p-2 rounded-lg mr-3">
              <i className="fa-solid fa-puzzle-piece text-2xl"></i>
            </div>
            <span className="font-bold text-xl tracking-tight">Crostic</span>
          </div>
          
          <div className="hidden md:flex space-x-4">
            {[
              { id: 'home', label: 'Home', icon: 'fa-house' },
              { id: 'game', label: 'Play', icon: 'fa-gamepad' },
              { id: 'leaderboard', label: 'Leaderboard', icon: 'fa-trophy' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
                  currentPage === item.id ? 'bg-primary-dark text-white' : 'hover:bg-primary-dark/50'
                }`}
              >
                <i className={`fa-solid ${item.icon}`}></i>
                {item.label}
              </button>
            ))}
            
            {user?.role === 'admin' && (
              <button
                onClick={() => onNavigate('admin')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
                  currentPage === 'admin' ? 'bg-red-500 text-white' : 'hover:bg-red-600'
                }`}
              >
                <i className="fa-solid fa-shield-halved"></i>
                Admin
              </button>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div 
                  className="flex items-center gap-2 cursor-pointer hover:bg-white/10 px-3 py-1.5 rounded-full transition"
                  onClick={() => onNavigate('profile')}
                >
                  <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full border-2 border-white/50" />
                  <span className="hidden sm:block text-sm font-medium">{user.username}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="text-white/80 hover:text-white p-2"
                  title="Logout"
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('auth')}
                className="bg-secondary hover:bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Login
              </button>
            )}
            
            {/* Mobile Menu Button - simplified for this demo */}
            <button className="md:hidden p-2 text-white">
              <i className="fa-solid fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;