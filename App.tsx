import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Game from './pages/Game';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import { User } from './types';
import { authService } from './services/authService';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLogin = async (email: string) => {
    const loggedUser = await authService.login(email);
    setUser(loggedUser);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onPlay={() => setCurrentPage('game')} />;
      case 'game':
        return <Game />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'profile':
        return user ? <Profile user={user} /> : <Auth onLogin={handleLogin} />;
      case 'auth':
        return <Auth onLogin={handleLogin} />;
      case 'admin':
        return user?.role === 'admin' ? <Admin /> : <Home onPlay={() => setCurrentPage('game')} />;
      default:
        return <Home onPlay={() => setCurrentPage('game')} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {currentPage !== 'admin' && (
        <Navbar 
          user={user} 
          onNavigate={setCurrentPage} 
          currentPage={currentPage}
          onLogout={handleLogout}
        />
      )}
      
      <main>
        {renderPage()}
      </main>
      
      {currentPage !== 'admin' && (
        <footer className="bg-dark text-white py-8 mt-auto">
          <div className="container mx-auto px-6 text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
               <div className="bg-white/10 p-1.5 rounded-md">
                 <i className="fa-solid fa-puzzle-piece"></i>
               </div>
               <span className="font-bold text-lg">Crostic</span>
            </div>
            <p className="text-gray-400 text-sm">&copy; 2024 Crostic Crossword. All rights reserved.</p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;