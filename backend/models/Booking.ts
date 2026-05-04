export interface Booking {
  id: string; // Unique booking ID
  userId: string;
  packageId: string;
  bookingDate: Date;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  totalAmount: number;
  numberOfPeople: number;
}
