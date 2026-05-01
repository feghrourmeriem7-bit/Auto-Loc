export const reservations = [
  {
    id: 1,
    carId: 1,
    carBrand: "Mercedes-Benz",
    carModel: "Classe C",
    carImage: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop",
    startDate: "2024-12-15",
    endDate: "2024-12-20",
    totalPrice: 2250,
    status: "confirmed",
    city: "Alger",
    createdAt: "2024-12-10"
  },
  {
    id: 2,
    carId: 3,
    carBrand: "Audi",
    carModel: "A4",
    carImage: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop",
    startDate: "2024-12-22",
    endDate: "2024-12-25",
    totalPrice: 1200,
    status: "pending",
    city: "Constantine",
    createdAt: "2024-12-18"
  },
  {
    id: 3,
    carId: 5,
    carBrand: "Volkswagen",
    carModel: "Golf 8",
    carImage: "https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?w=600&h=400&fit=crop",
    startDate: "2024-11-10",
    endDate: "2024-11-15",
    totalPrice: 1400,
    status: "completed",
    city: "Annaba",
    createdAt: "2024-11-05"
  },
  {
    id: 4,
    carId: 8,
    carBrand: "Dacia",
    carModel: "Duster",
    carImage: "https://images.unsplash.com/photo-1549317661-bd32c8ce0637?w=600&h=400&fit=crop",
    startDate: "2024-12-01",
    endDate: "2024-12-03",
    totalPrice: 400,
    status: "cancelled",
    city: "Setif",
    createdAt: "2024-11-28"
  },
  {
    id: 5,
    carId: 4,
    carBrand: "Range Rover",
    carModel: "Sport",
    carImage: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=600&h=400&fit=crop",
    startDate: "2025-01-05",
    endDate: "2025-01-10",
    totalPrice: 4000,
    status: "pending",
    city: "Alger",
    createdAt: "2024-12-20"
  }
];

export const notifications = [
  {
    id: 1,
    title: "Réservation confirmée",
    message: "Votre réservation de Mercedes-Benz Classe C a été confirmée.",
    time: "Il y a 2 heures",
    read: false,
    type: "success"
  },
  {
    id: 2,
    title: "Rappel de retour",
    message: "N'oubliez pas de retourner la Volkswagen Golf 8 demain.",
    time: "Il y a 5 heures",
    read: false,
    type: "warning"
  },
  {
    id: 3,
    title: "Nouvelle offre",
    message: "Profitez de -20% sur les locations longue durée ce mois-ci !",
    time: "Il y a 1 jour",
    read: true,
    type: "info"
  },
  {
    id: 4,
    title: "Réservation annulée",
    message: "Votre réservation de Dacia Duster a été annulée avec succès.",
    time: "Il y a 3 jours",
    read: true,
    type: "error"
  }
];
