import { User } from '../types';

const USER_KEY = 'crostic_user';

export const authService = {
  login: async (email: string): Promise<User> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser: User = {
          id: 'user_' + Date.now(),
          username: email.split('@')[0],
          email,
          avatar: `https://picsum.photos/seed/${email}/150`,
          level: 1,
          score: 1250,
          role: email.includes('admin') ? 'admin' : 'user',
          createdAt: new Date().toISOString()
        };
        localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
        resolve(mockUser);
      }, 800);
    });
  },

  logout: () => {
    localStorage.removeItem(USER_KEY);
  },

  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(USER_KEY);
  }
};