export interface TourPackage {
  id: string;
  title: string;
  description: string;
  destination: string;
  price: number;
  durationDays: number;
  availableSeats: number;
  imageUrl?: string;
  tags?: string[]; // e.g., 'adventure', 'budget', 'luxury'
  createdAt: Date;
}
