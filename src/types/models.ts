export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  nationality: string;
  passportNumber: string;
  visaType: string;
  memberSince: string;
}

export interface Attraction {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  category: string;
  images: string[];
  rating: number;
  reviewCount: number;
  price: number;
  currency: string;
  latitude: number;
  longitude: number;
  city: string;
  openingHours: string;
  isFeatured: boolean;
}

export interface TicketType {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  available: boolean;
}

export interface Entertainment {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  type: 'theme_park' | 'concert' | 'festival' | 'sports' | 'theater';
  venue: string;
  images: string[];
  date: string;
  endDate: string;
  city: string;
  ticketTypes: TicketType[];
  isTrending: boolean;
  isSoldOut: boolean;
}

export interface MenuItem {
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface Restaurant {
  id: string;
  name: string;
  nameAr: string;
  cuisine: string;
  priceRange: 1 | 2 | 3 | 4;
  rating: number;
  reviewCount: number;
  images: string[];
  latitude: number;
  longitude: number;
  city: string;
  dietaryOptions: string[];
  isOpen: boolean;
  waitTime: number;
  menuHighlights: MenuItem[];
  isFeatured: boolean;
}

export interface Promotion {
  title: string;
  discount: string;
  validUntil: string;
}

export interface Mall {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  images: string[];
  city: string;
  latitude: number;
  longitude: number;
  storeCount: number;
  openingHours: string;
  features: string[];
  promotions: Promotion[];
}

export interface RoomType {
  name: string;
  price: number;
  capacity: number;
  amenities: string[];
}

export interface Hotel {
  id: string;
  name: string;
  nameAr: string;
  stars: 1 | 2 | 3 | 4 | 5;
  description: string;
  images: string[];
  city: string;
  latitude: number;
  longitude: number;
  pricePerNight: number;
  amenities: string[];
  rating: number;
  reviewCount: number;
  roomTypes: RoomType[];
}

export interface Transaction {
  id: string;
  type: 'payment' | 'exchange' | 'refund' | 'topup';
  amount: number;
  currency: string;
  description: string;
  date: string;
  category: string;
  merchantLogo: string;
}

export interface PrayerTime {
  name: string;
  time: string;
  isNext: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  city: string;
  image: string;
  category: string;
}

export interface Ticket {
  id: string;
  eventName: string;
  venue: string;
  date: string;
  ticketType: string;
  qrCode: string;
  status: 'active' | 'used' | 'expired';
}

export interface Transport {
  id: string;
  type: 'metro' | 'bus' | 'train' | 'taxi' | 'rental';
  name: string;
  route: string;
  fare: number;
  duration: string;
}

export interface Booking {
  id: string;
  hotelName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guestName: string;
  confirmationCode: string;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
}

export interface Document {
  id: string;
  type: 'passport' | 'visa' | 'insurance' | 'boarding_pass';
  title: string;
  number: string;
  issuedDate: string;
  expiryDate: string;
  country: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}
