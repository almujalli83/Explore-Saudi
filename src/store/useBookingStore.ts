import { create } from 'zustand';
import { Booking } from '../types/models';

const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'bk_001',
    hotelName: 'Raffles Makkah Palace',
    roomType: 'Deluxe King',
    checkIn: '2026-04-10',
    checkOut: '2026-04-14',
    guestName: 'Ahmad Al-Rashid',
    confirmationCode: 'RMP-48291',
    status: 'upcoming',
  },
  {
    id: 'bk_002',
    hotelName: 'Four Seasons Hotel Riyadh',
    roomType: 'Premier Suite',
    checkIn: '2026-03-01',
    checkOut: '2026-03-05',
    guestName: 'Ahmad Al-Rashid',
    confirmationCode: 'FSR-73840',
    status: 'completed',
  },
  {
    id: 'bk_003',
    hotelName: 'Burj Al Arab Jumeirah',
    roomType: 'Ocean View Suite',
    checkIn: '2026-05-20',
    checkOut: '2026-05-25',
    guestName: 'Ahmad Al-Rashid',
    confirmationCode: 'BAJ-92017',
    status: 'upcoming',
  },
];

interface BookingState {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  getBookingById: (id: string) => Booking | undefined;
  cancelBooking: (id: string) => void;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  bookings: MOCK_BOOKINGS,

  addBooking: (booking: Booking) => {
    set((state) => ({ bookings: [booking, ...state.bookings] }));
  },

  getBookingById: (id: string) => {
    return get().bookings.find((b) => b.id === id);
  },

  cancelBooking: (id: string) => {
    set((state) => ({
      bookings: state.bookings.map((b) =>
        b.id === id ? { ...b, status: 'cancelled' as const } : b
      ),
    }));
  },
}));
