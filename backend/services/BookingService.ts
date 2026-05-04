import { Booking } from '../models/Booking';
import { BookingRepository } from '../repositories/BookingRepository';

export class BookingService {
  private bookingRepository: BookingRepository;

  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  // Requirement 9, 10 & 11: Support booking, store details, generate unique ID
  async createBooking(userId: string, packageId: string, amount: number, people: number): Promise<Booking> {
    const uniqueId = `BKG-${Date.now()}-${Math.floor(Math.random() * 1000)}`; // Unique Booking ID
    
    const newBooking: Booking = {
      id: uniqueId,
      userId,
      packageId,
      bookingDate: new Date(),
      status: 'PENDING',
      totalAmount: amount,
      numberOfPeople: people
    };

    return this.bookingRepository.create(newBooking);
  }

  async getBookingsByUser(userId: string): Promise<Booking[]> {
    return this.bookingRepository.findByUserId(userId);
  }

  async confirmBooking(bookingId: string): Promise<Booking | null> {
    return this.bookingRepository.update(bookingId, { status: 'CONFIRMED' });
  }

  async cancelBooking(bookingId: string): Promise<Booking | null> {
    return this.bookingRepository.update(bookingId, { status: 'CANCELLED' });
  }
}
