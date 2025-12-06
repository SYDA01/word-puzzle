import React, { useState } from 'react';

interface AuthProps {
  onLogin: (email: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
        onLogin(email);
        setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col md:flex-row h-auto md:min-h-[500px]">
        {/* Form Section */}
        <div className="p-8 w-full flex flex-col justify-center">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-dark mb-2">{isLogin ? 'Welcome Back!' : 'Join Crostic'}</h2>
            <p className="text-gray-400 text-sm">
              {isLogin ? 'Enter your details to continue.' : 'Start your puzzle journey today.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
             {!isLogin && (
               <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Username</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Choose a username" />
               </div>
             )}
             
             <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" 
                  placeholder="name@example.com" 
                  required
                />
             </div>

             <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" 
                  placeholder="••••••••" 
                  required
                />
             </div>

             <button 
               type="submit" 
               disabled={loading}
               className="w-full bg-primary hover:bg-primary-dark text-white py-3.5 rounded-xl font-bold shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
             >
               {loading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : (isLogin ? 'Log In' : 'Sign Up')}
             </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary font-bold ml-1 hover:underline focus:outline-none"
              >
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
          
          <div className="my-6 flex items-center">
             <div className="flex-1 border-t border-gray-200"></div>
             <div className="px-4 text-xs text-gray-400 font-bold uppercase">Or</div>
             <div className="flex-1 border-t border-gray-200"></div>
          </div>
          
          <button className="w-full bg-white border border-gray-200 text-dark py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
             <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" />
             Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;