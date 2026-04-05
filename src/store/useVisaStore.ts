import { create } from 'zustand';

export interface TourismPackage {
  id: string;
  flight: {
    airline: string;
    flightNumber: string;
    departure: string;
    arrival: string;
    departureCity: string;
    arrivalCity: string;
    class: 'Economy' | 'Business' | 'First';
    price: number;
    confirmed: boolean;
  } | null;
  hotel: {
    id: string;
    name: string;
    city: string;
    stars: number;
    checkIn: string;
    checkOut: string;
    roomType: string;
    pricePerNight: number;
    totalPrice: number;
    confirmed: boolean;
  } | null;
  activities: {
    id: string;
    name: string;
    date: string;
    city: string;
    price: number;
  }[];
  totalPrice: number;
  status: 'building' | 'ready' | 'submitted' | 'approved' | 'rejected';
}

export interface VisaApplication {
  id: string;
  fullName: string;
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  purposeOfVisit: string;
  arrivalDate: string;
  departureDate: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  packageId: string;
  submittedAt: string | null;
  approvedAt: string | null;
  visaNumber: string | null;
}

interface VisaState {
  currentPackage: TourismPackage;
  visaApplication: VisaApplication | null;
  setFlight: (flight: TourismPackage['flight']) => void;
  setHotel: (hotel: TourismPackage['hotel']) => void;
  addActivity: (activity: TourismPackage['activities'][0]) => void;
  removeActivity: (id: string) => void;
  submitApplication: (application: Omit<VisaApplication, 'id' | 'status' | 'packageId' | 'submittedAt' | 'approvedAt' | 'visaNumber'>) => void;
  approveVisa: () => void;
  resetPackage: () => void;
}

const initialPackage: TourismPackage = {
  id: 'pkg_001',
  flight: null,
  hotel: null,
  activities: [],
  totalPrice: 0,
  status: 'building',
};

export const useVisaStore = create<VisaState>((set, get) => ({
  currentPackage: initialPackage,
  visaApplication: null,

  setFlight: (flight) => {
    set((state) => {
      const pkg = { ...state.currentPackage, flight };
      pkg.totalPrice = (flight?.price ?? 0) + (pkg.hotel?.totalPrice ?? 0) + pkg.activities.reduce((s, a) => s + a.price, 0);
      if (pkg.flight?.confirmed && pkg.hotel?.confirmed) pkg.status = 'ready';
      return { currentPackage: pkg };
    });
  },

  setHotel: (hotel) => {
    set((state) => {
      const pkg = { ...state.currentPackage, hotel };
      pkg.totalPrice = (pkg.flight?.price ?? 0) + (hotel?.totalPrice ?? 0) + pkg.activities.reduce((s, a) => s + a.price, 0);
      if (pkg.flight?.confirmed && pkg.hotel?.confirmed) pkg.status = 'ready';
      return { currentPackage: pkg };
    });
  },

  addActivity: (activity) => {
    set((state) => {
      const activities = [...state.currentPackage.activities, activity];
      const pkg = { ...state.currentPackage, activities };
      pkg.totalPrice = (pkg.flight?.price ?? 0) + (pkg.hotel?.totalPrice ?? 0) + activities.reduce((s, a) => s + a.price, 0);
      return { currentPackage: pkg };
    });
  },

  removeActivity: (id) => {
    set((state) => {
      const activities = state.currentPackage.activities.filter((a) => a.id !== id);
      const pkg = { ...state.currentPackage, activities };
      pkg.totalPrice = (pkg.flight?.price ?? 0) + (pkg.hotel?.totalPrice ?? 0) + activities.reduce((s, a) => s + a.price, 0);
      return { currentPackage: pkg };
    });
  },

  submitApplication: (appData) => {
    const app: VisaApplication = {
      ...appData,
      id: 'visa_' + Date.now(),
      status: 'pending',
      packageId: get().currentPackage.id,
      submittedAt: new Date().toISOString(),
      approvedAt: null,
      visaNumber: null,
    };
    set((state) => ({
      visaApplication: app,
      currentPackage: { ...state.currentPackage, status: 'submitted' },
    }));
    // Auto-approve after 2 seconds for demo
    setTimeout(() => get().approveVisa(), 2000);
  },

  approveVisa: () => {
    set((state) => ({
      visaApplication: state.visaApplication
        ? {
            ...state.visaApplication,
            status: 'approved',
            approvedAt: new Date().toISOString(),
            visaNumber: 'SA-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-2026',
          }
        : null,
      currentPackage: { ...state.currentPackage, status: 'approved' },
    }));
  },

  resetPackage: () => {
    set({ currentPackage: initialPackage, visaApplication: null });
  },
}));
