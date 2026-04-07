import { create } from 'zustand';
import { User } from '../types/models';

const MOCK_USER: User = {
  id: 'usr_001',
  name: 'Ahmad Al-Rashid',
  email: 'ahmad.rashid@email.com',
  avatar: 'https://i.pravatar.cc/150?u=ahmad',
  nationality: 'UAE',
  passportNumber: 'P1234567',
  visaType: 'Tourist Visa',
  memberSince: '2025-11-15',
};

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  setOnboarded: () => void;
  register: (name: string, email: string, passportNumber: string, nationality: string) => void;
  updateProfile: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: MOCK_USER,
  isAuthenticated: true,
  isOnboarded: true,

  login: (_email: string, _password: string) => {
    set({
      user: MOCK_USER,
      isAuthenticated: true,
    });
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  setOnboarded: () => {
    set({ isOnboarded: true });
  },

  register: (name: string, email: string, passportNumber: string, nationality: string) => {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name,
      email,
      avatar: `https://i.pravatar.cc/150?u=${email}`,
      nationality,
      passportNumber,
      visaType: 'Tourist Visa',
      memberSince: new Date().toISOString().split('T')[0],
    };
    set({ user: newUser, isAuthenticated: true, isOnboarded: true });
  },

  updateProfile: (updates: Partial<User>) => {
    const current = get().user;
    if (current) {
      set({ user: { ...current, ...updates } });
    }
  },
}));
