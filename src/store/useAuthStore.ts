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
  register: (name: string, email: string, passportNumber?: string, nationality?: string) => void;
  updateProfile: (fields: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isOnboarded: false,

  login: (_email: string, _password: string) => {
    set({ user: MOCK_USER, isAuthenticated: true });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  setOnboarded: () => {
    set({ isOnboarded: true });
  },

  register: (name, email, passportNumber, nationality) => {
    set({
      user: {
        ...MOCK_USER,
        name,
        email,
        passportNumber: passportNumber ?? MOCK_USER.passportNumber,
        nationality: nationality ?? MOCK_USER.nationality,
      },
      isAuthenticated: true,
    });
  },

  updateProfile: (fields) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...fields } : state.user,
    }));
  },
}));
