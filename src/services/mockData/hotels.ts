export const hotels = [
  {
    id: 'h1', name: 'The Ritz-Carlton, Riyadh', nameAr: 'فندق الريتز كارلتون، الرياض', stars: 5, description: 'An opulent palace hotel set within 52 acres of landscaped gardens, featuring world-class dining, a luxury spa, and iconic Arabian architecture.', images: ['https://images.pexels.com/photos/35761/pexels-photo-35761.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/30320202/pexels-photo-30320202.jpeg?auto=compress&cs=tinysrgb&w=800'], city: 'Riyadh', latitude: 24.6904, longitude: 46.6850, pricePerNight: 3500, amenities: ['Spa', 'Pool', 'Fine Dining', 'Gym', 'Business Center', 'Concierge', 'Valet', 'WiFi'], rating: 4.8, reviewCount: 1850,
    roomTypes: [
      { name: 'Deluxe Room', price: 3500, capacity: 2, amenities: ['King Bed', 'City View', 'Marble Bath'] },
      { name: 'Executive Suite', price: 6500, capacity: 3, amenities: ['Living Room', 'Garden View', 'Butler Service'] },
      { name: 'Royal Suite', price: 25000, capacity: 4, amenities: ['3 Bedrooms', 'Private Pool', 'Dining Room', 'Butler'] },
    ],
  },
  {
    id: 'h2', name: 'Four Seasons Riyadh', nameAr: 'فور سيزونز الرياض', stars: 5, description: 'Located in the iconic Kingdom Tower, offering panoramic city views, Michelin-level dining, and direct access to Kingdom Centre Mall.', images: ['https://images.pexels.com/photos/30320202/pexels-photo-30320202.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/31849529/pexels-photo-31849529.jpeg?auto=compress&cs=tinysrgb&w=800'], city: 'Riyadh', latitude: 24.7112, longitude: 46.6745, pricePerNight: 2800, amenities: ['Spa', 'Pool', 'Sky Bridge Access', 'Gym', 'Restaurants', 'Mall Access', 'WiFi'], rating: 4.7, reviewCount: 2200,
    roomTypes: [
      { name: 'Superior Room', price: 2800, capacity: 2, amenities: ['King Bed', 'City View', 'Rain Shower'] },
      { name: 'Kingdom Suite', price: 5500, capacity: 3, amenities: ['Separate Living', 'Panoramic View', 'Lounge Access'] },
    ],
  },
  {
    id: 'h3', name: 'Banyan Tree AlUla', nameAr: 'بانيان تري العلا', stars: 5, description: 'An extraordinary desert resort with private villas nestled among the ancient sandstone formations of AlUla, offering unparalleled stargazing and heritage experiences.', images: ['https://images.pexels.com/photos/9822971/pexels-photo-9822971.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/459319/pexels-photo-459319.jpeg?auto=compress&cs=tinysrgb&w=800'], city: 'AlUla', latitude: 26.6100, longitude: 37.9200, pricePerNight: 4200, amenities: ['Private Pool', 'Desert Tours', 'Spa', 'Stargazing', 'Heritage Excursions', 'Fine Dining'], rating: 4.9, reviewCount: 680,
    roomTypes: [
      { name: 'Desert Villa', price: 4200, capacity: 2, amenities: ['Private Pool', 'Terrace', 'Desert View'] },
      { name: 'Royal Pavilion', price: 8500, capacity: 4, amenities: ['2 Bedrooms', 'Private Pool', 'Butler', 'Outdoor Dining'] },
    ],
  },
  {
    id: 'h4', name: 'Habitas AlUla', nameAr: 'هابيتاس العلا', stars: 5, description: 'A boutique eco-luxury resort built into the AlUla canyon, combining sustainable design with immersive wellness experiences and Nabataean heritage.', images: ['https://images.pexels.com/photos/459319/pexels-photo-459319.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/9822971/pexels-photo-9822971.jpeg?auto=compress&cs=tinysrgb&w=800'], city: 'AlUla', latitude: 26.6200, longitude: 37.9100, pricePerNight: 3800, amenities: ['Wellness Center', 'Canyon Pool', 'Yoga', 'Desert Safari', 'Organic Dining', 'Stargazing'], rating: 4.8, reviewCount: 520,
    roomTypes: [
      { name: 'Canyon Villa', price: 3800, capacity: 2, amenities: ['Canyon View', 'Outdoor Shower', 'Terrace'] },
      { name: 'Heritage Suite', price: 6200, capacity: 3, amenities: ['Living Area', 'Private Garden', 'Plunge Pool'] },
    ],
  },
  {
    id: 'h5', name: 'St. Regis Red Sea', nameAr: 'سانت ريجس البحر الأحمر', stars: 5, description: 'An exclusive island resort in the Red Sea project offering pristine beaches, coral reef diving, and butler-serviced overwater and beachfront villas.', images: ['https://images.pexels.com/photos/3100361/pexels-photo-3100361.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800'], city: 'Red Sea', latitude: 25.8000, longitude: 36.5000, pricePerNight: 5000, amenities: ['Private Beach', 'Diving', 'Spa', 'Water Sports', 'Butler Service', 'Marina', 'Restaurants'], rating: 4.9, reviewCount: 340,
    roomTypes: [
      { name: 'Overwater Villa', price: 5000, capacity: 2, amenities: ['Glass Floor', 'Private Deck', 'Ocean View'] },
      { name: 'Beach Villa', price: 6500, capacity: 4, amenities: ['Private Beach', 'Pool', 'Garden', 'Butler'] },
    ],
  },
  {
    id: 'h6', name: 'Park Hyatt Jeddah', nameAr: 'بارك حياة جدة', stars: 5, description: 'A beachfront luxury hotel on the Jeddah Corniche with stunning Red Sea views, private beach, and world-class Mediterranean dining.', images: ['https://images.pexels.com/photos/5625713/pexels-photo-5625713.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=800'], city: 'Jeddah', latitude: 21.5600, longitude: 39.1050, pricePerNight: 2200, amenities: ['Private Beach', 'Pool', 'Spa', 'Gym', 'Restaurants', 'Marina', 'WiFi'], rating: 4.6, reviewCount: 1600,
    roomTypes: [
      { name: 'Sea View Room', price: 2200, capacity: 2, amenities: ['Sea View', 'Balcony', 'Rain Shower'] },
      { name: 'Presidential Suite', price: 8000, capacity: 4, amenities: ['Panoramic Sea View', 'Living Room', 'Dining', 'Butler'] },
    ],
  },
  {
    id: 'h7', name: 'Hilton Riyadh Hotel & Residences', nameAr: 'هيلتون الرياض', stars: 4, description: 'A modern business and leisure hotel in central Riyadh with excellent facilities, multiple restaurants, and easy access to major attractions.', images: ['https://images.pexels.com/photos/31849529/pexels-photo-31849529.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/5625713/pexels-photo-5625713.jpeg?auto=compress&cs=tinysrgb&w=800'], city: 'Riyadh', latitude: 24.6900, longitude: 46.6900, pricePerNight: 850, amenities: ['Pool', 'Gym', 'Restaurant', 'Business Center', 'Parking', 'WiFi'], rating: 4.3, reviewCount: 3200,
    roomTypes: [
      { name: 'Guest Room', price: 850, capacity: 2, amenities: ['Queen Bed', 'Work Desk', 'City View'] },
      { name: 'Executive Room', price: 1200, capacity: 2, amenities: ['Lounge Access', 'King Bed', 'Upgraded Amenities'] },
    ],
  },
  {
    id: 'h8', name: 'Marriott Jeddah', nameAr: 'ماريوت جدة', stars: 4, description: 'A well-located hotel near the Jeddah Corniche offering comfortable rooms, a rooftop pool with sea views, and diverse dining options.', images: ['https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/18054762/pexels-photo-18054762.jpeg?auto=compress&cs=tinysrgb&w=800'], city: 'Jeddah', latitude: 21.5500, longitude: 39.1500, pricePerNight: 750, amenities: ['Rooftop Pool', 'Gym', 'Restaurant', 'Business Center', 'WiFi', 'Parking'], rating: 4.2, reviewCount: 2800,
    roomTypes: [
      { name: 'Deluxe Room', price: 750, capacity: 2, amenities: ['King Bed', 'Sea Glimpse', 'Mini Bar'] },
      { name: 'Suite', price: 1400, capacity: 3, amenities: ['Living Area', 'Sea View', 'Lounge Access'] },
    ],
  },
  {
    id: 'h9', name: 'Novotel Al Anoud Riyadh', nameAr: 'نوفوتيل العنود الرياض', stars: 4, description: 'A contemporary hotel on Olaya Street in the heart of Riyadh\'s business district, ideal for both business travelers and tourists exploring the city.', images: ['https://images.pexels.com/photos/30320202/pexels-photo-30320202.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/35761/pexels-photo-35761.jpeg?auto=compress&cs=tinysrgb&w=800'], city: 'Riyadh', latitude: 24.6800, longitude: 46.6900, pricePerNight: 550, amenities: ['Pool', 'Gym', 'Restaurant', 'Meeting Rooms', 'WiFi', 'Parking'], rating: 4.1, reviewCount: 2100,
    roomTypes: [
      { name: 'Standard Room', price: 550, capacity: 2, amenities: ['Queen Bed', 'Work Desk', 'WiFi'] },
      { name: 'Executive Room', price: 780, capacity: 2, amenities: ['King Bed', 'Lounge Access', 'Late Checkout'] },
    ],
  },
  {
    id: 'h10', name: 'Shaden Resort, AlUla', nameAr: 'منتجع شادن العلا', stars: 4, description: 'A unique desert resort offering eco-friendly mirrored lodges that blend into the AlUla landscape, providing an intimate connection with the ancient desert.', images: ['https://images.pexels.com/photos/9822971/pexels-photo-9822971.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/4023386/pexels-photo-4023386.jpeg?auto=compress&cs=tinysrgb&w=800'], city: 'AlUla', latitude: 26.6150, longitude: 37.9150, pricePerNight: 1800, amenities: ['Desert View', 'Restaurant', 'Tours', 'Stargazing', 'WiFi'], rating: 4.5, reviewCount: 420,
    roomTypes: [
      { name: 'Mirrored Lodge', price: 1800, capacity: 2, amenities: ['Desert View', 'Private Terrace', 'Mirrored Design'] },
      { name: 'Premium Lodge', price: 2600, capacity: 3, amenities: ['Larger Space', 'Seating Area', 'Premium Amenities'] },
    ],
  },
  {
    id: 'h11', name: 'Crowne Plaza Riyadh', nameAr: 'كراون بلازا الرياض', stars: 4, description: 'A reliable business hotel on King Fahd Road with modern facilities, a full-service spa, and multiple dining venues serving international cuisine.', images: ['https://images.pexels.com/photos/5625713/pexels-photo-5625713.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/30320202/pexels-photo-30320202.jpeg?auto=compress&cs=tinysrgb&w=800'], city: 'Riyadh', latitude: 24.7000, longitude: 46.6800, pricePerNight: 650, amenities: ['Spa', 'Pool', 'Gym', 'Restaurant', 'Business Center', 'WiFi'], rating: 4.2, reviewCount: 1900,
    roomTypes: [
      { name: 'Standard Room', price: 650, capacity: 2, amenities: ['Queen Bed', 'Work Desk'] },
      { name: 'Club Room', price: 950, capacity: 2, amenities: ['Lounge Access', 'King Bed', 'Welcome Amenity'] },
    ],
  },
  {
    id: 'h12', name: 'ibis Riyadh Olaya Street', nameAr: 'إيبيس الرياض شارع العليا', stars: 3, description: 'An affordable and modern hotel in the heart of Riyadh\'s Olaya business district, perfect for budget-conscious travelers seeking a central location.', images: ['https://images.pexels.com/photos/35761/pexels-photo-35761.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/5625713/pexels-photo-5625713.jpeg?auto=compress&cs=tinysrgb&w=800'], city: 'Riyadh', latitude: 24.6950, longitude: 46.6850, pricePerNight: 350, amenities: ['Restaurant', 'WiFi', 'Parking', '24h Reception'], rating: 3.9, reviewCount: 4500,
    roomTypes: [
      { name: 'Standard Room', price: 350, capacity: 2, amenities: ['Double Bed', 'WiFi', 'AC'] },
    ],
  },
  {
    id: 'h13', name: 'Holiday Inn Jeddah Gateway', nameAr: 'هوليداي إن جدة', stars: 3, description: 'A comfortable mid-range hotel conveniently located near King Abdulaziz International Airport, ideal for transit stays and exploring Jeddah.', images: ['https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/5625713/pexels-photo-5625713.jpeg?auto=compress&cs=tinysrgb&w=800'], city: 'Jeddah', latitude: 21.5800, longitude: 39.1700, pricePerNight: 420, amenities: ['Pool', 'Restaurant', 'Gym', 'Airport Shuttle', 'WiFi', 'Parking'], rating: 4.0, reviewCount: 3100,
    roomTypes: [
      { name: 'Standard Room', price: 420, capacity: 2, amenities: ['Queen Bed', 'WiFi', 'Work Desk'] },
      { name: 'Family Room', price: 600, capacity: 4, amenities: ['2 Double Beds', 'Sofa', 'Mini Fridge'] },
    ],
  },
];
