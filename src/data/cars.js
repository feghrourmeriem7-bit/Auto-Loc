export const cars = [
  {
    id: 1,
    brand: "Mercedes-Benz",
    model: "Classe C",
    year: 2024,
    price: 15000,
    city: "Alger",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=500&fit=crop"
    ],
    rating: 4.8,
    reviews: 124,
    transmission: "Automatique",
    fuel: "Diesel",
    seats: 5,
    features: ["GPS", "Bluetooth", "Climatisation", "Caméra de recul", "Sièges cuir"],
    available: true,
    description: "Mercedes-Benz Classe C, le choix parfait pour vos déplacements professionnels. Confort et élégance garantis."
  },
  {
    id: 2,
    brand: "BMW",
    model: "Série 3",
    year: 2024,
    price: 12000,
    city: "Oran",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1520050206757-cda96a041675?w=800&h=500&fit=crop"
    ],
    rating: 4.7,
    reviews: 98,
    transmission: "Automatique",
    fuel: "Essence",
    seats: 5,
    features: ["GPS", "Bluetooth", "Climatisation", "Toit ouvrant", "Apple CarPlay"],
    available: true,
    description: "BMW Série 3, performance et style réunis. Une expérience de conduite exceptionnelle."
  },
  {
    id: 3,
    brand: "Audi",
    model: "A4",
    year: 2023,
    price: 10000,
    city: "Constantine",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&h=500&fit=crop"
    ],
    rating: 4.6,
    reviews: 87,
    transmission: "Automatique",
    fuel: "Diesel",
    seats: 5,
    features: ["GPS", "Bluetooth", "Climatisation", "Phares LED", "Régulateur adaptatif"],
    available: true,
    description: "Audi A4, technologie et confort de pointe. Idéale pour les longs trajets."
  },
  {
    id: 4,
    brand: "Range Rover",
    model: "Sport",
    year: 2024,
    price: 25000,
    city: "Alger",
    image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=600&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1519245659620-e859806a8d7b?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1612825173281-9a193378527e?w=800&h=500&fit=crop"
    ],
    rating: 4.9,
    reviews: 156,
    transmission: "Automatique",
    fuel: "Diesel",
    seats: 7,
    features: ["GPS", "Bluetooth", "Climatisation bi-zone", "4x4", "Caméra 360°", "Sièges cuir"],
    available: true,
    description: "Range Rover Sport, le SUV de luxe par excellence. Puissance et raffinement."
  },
  {
    id: 5,
    brand: "Volkswagen",
    model: "Golf 8",
    year: 2023,
    price: 6000,
    city: "Annaba",
    image: "https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?w=600&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=500&fit=crop"
    ],
    rating: 4.5,
    reviews: 203,
    transmission: "Manuelle",
    fuel: "Essence",
    seats: 5,
    features: ["Bluetooth", "Climatisation", "Écran tactile", "Régulateur de vitesse"],
    available: true,
    description: "Volkswagen Golf 8, la compacte polyvalente. Fiable et économique."
  },
  {
    id: 6,
    brand: "Toyota",
    model: "Corolla",
    year: 2024,
    price: 5000,
    city: "Blida",
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1583267746897-2cf415887172?w=800&h=500&fit=crop"
    ],
    rating: 4.4,
    reviews: 312,
    transmission: "Automatique",
    fuel: "Hybride",
    seats: 5,
    features: ["Bluetooth", "Climatisation", "Caméra de recul", "Aide au stationnement"],
    available: false,
    description: "Toyota Corolla Hybride, écologique et économique. Le choix intelligent."
  },
  {
    id: 7,
    brand: "Porsche",
    model: "Cayenne",
    year: 2024,
    price: 30000,
    city: "Alger",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1580274455191-1c62238ce452?w=800&h=500&fit=crop"
    ],
    rating: 4.9,
    reviews: 67,
    transmission: "Automatique",
    fuel: "Essence",
    seats: 5,
    features: ["GPS", "Bluetooth", "Climatisation bi-zone", "Toit panoramique", "Son Bose", "Sièges sport"],
    available: true,
    description: "Porsche Cayenne, le SUV sportif ultime. Performance et prestige."
  },
  {
    id: 8,
    brand: "Dacia",
    model: "Duster",
    year: 2023,
    price: 4000,
    city: "Setif",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0637?w=600&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0637?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=500&fit=crop"
    ],
    rating: 4.3,
    reviews: 445,
    transmission: "Manuelle",
    fuel: "Diesel",
    seats: 5,
    features: ["Climatisation", "Bluetooth", "4x4 disponible"],
    available: true,
    description: "Dacia Duster, le SUV accessible. Robuste et polyvalent pour toutes vos aventures."
  },
  {
    id: 9,
    brand: "Peugeot",
    model: "3008",
    year: 2024,
    price: 8000,
    city: "Oran",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=500&fit=crop"
    ],
    rating: 4.6,
    reviews: 178,
    transmission: "Automatique",
    fuel: "Diesel",
    seats: 5,
    features: ["GPS", "i-Cockpit", "Climatisation bi-zone", "Caméra de recul", "Apple CarPlay"],
    available: true,
    description: "Peugeot 3008, le SUV technologique français. Design audacieux et confort premium."
  },
  {
    id: 10,
    brand: "Renault",
    model: "Clio 5",
    year: 2023,
    price: 3500,
    city: "Constantine",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=500&fit=crop"
    ],
    rating: 4.2,
    reviews: 534,
    transmission: "Manuelle",
    fuel: "Essence",
    seats: 5,
    features: ["Bluetooth", "Climatisation", "Écran multimédia", "Régulateur de vitesse"],
    available: true,
    description: "Renault Clio 5, la citadine préférée des Algériens. Économique et agréable."
  },
  {
    id: 11,
    brand: "Hyundai",
    model: "Tucson",
    year: 2024,
    price: 9000,
    city: "Annaba",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1580274455191-1c62238ce452?w=800&h=500&fit=crop"
    ],
    rating: 4.5,
    reviews: 221,
    transmission: "Automatique",
    fuel: "Hybride",
    seats: 5,
    features: ["GPS", "Bluetooth", "Climatisation bi-zone", "Écran 10.25\"", "ADAS"],
    available: true,
    description: "Hyundai Tucson, design futuriste et technologies avancées. Le SUV nouvelle génération."
  },
  {
    id: 12,
    brand: "Kia",
    model: "Sportage",
    year: 2024,
    price: 8000,
    city: "Blida",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1580274455191-1c62238ce452?w=800&h=500&fit=crop"
    ],
    rating: 4.5,
    reviews: 189,
    transmission: "Automatique",
    fuel: "Diesel",
    seats: 5,
    features: ["GPS", "Bluetooth", "Climatisation", "Caméra 360°", "Sièges chauffants"],
    available: true,
    description: "Kia Sportage, le SUV complet avec garantie 7 ans. Fiabilité et confort."
  }
];

export const cities = ["Toutes", "Alger", "Oran", "Constantine", "Annaba", "Blida", "Setif"];

export const brands = ["Mercedes-Benz", "BMW", "Audi", "Range Rover", "Volkswagen", "Toyota", "Porsche", "Dacia", "Peugeot", "Renault", "Hyundai", "Kia"];
