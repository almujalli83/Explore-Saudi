export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  ExploreTab: undefined;
  WalletTab: undefined;
  ServicesTab: undefined;
  ProfileTab: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Notifications: undefined;
  Search: undefined;
  AttractionDetail: { id: string };
  HotelDetail: { id: string };
  HotelReservation: { hotelId: string; roomName: string | null };
  DigitalCheckIn: { hotelName: string; roomNumber: string; checkIn: string; checkOut: string };
  Accommodation: undefined;
  Dining: undefined;
  Shopping: undefined;
};

export type ExploreStackParamList = {
  Explore: undefined;
  AttractionDetail: { id: string };
  Entertainment: undefined;
  VenueDetail: { id: string };
  EventDetail: { id: string };
  SeatSelection: { eventId: string };
  TicketCheckout: { eventId: string; ticketTypeId: string; quantity: number };
  Dining: undefined;
  RestaurantDetail: { id: string };
  Reservation: { restaurantId: string };
  Shopping: undefined;
  MallDetail: { id: string };
  Accommodation: undefined;
  HotelDetail: { id: string };
  DigitalCheckIn: { bookingId?: string };
  AITripPlanner: undefined;
  PrayerTimes: undefined;
  CulturalGuide: undefined;
  CuisineFinder: undefined;
};

export type WalletStackParamList = {
  WalletDashboard: undefined;
  DigitalID: undefined;
  Payment: undefined;
  CurrencyExchange: undefined;
  ExpenseTracker: undefined;
  LoyaltyCards: undefined;
  MyTickets: undefined;
};

export type ServicesStackParamList = {
  Services: undefined;
  Transport: undefined;
  EmergencySOS: undefined;
  OfflineMaps: undefined;
  Insurance: undefined;
  LanguageHelper: undefined;
  CustomerCare: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  MyBookings: undefined;
  NFTCollection: undefined;
  Reviews: undefined;
  ShareExperience: undefined;
  PhotoSpots: undefined;
  Settings: undefined;
  EditProfile: undefined;
  DigitalDocuments: undefined;
  Registration: undefined;
};
