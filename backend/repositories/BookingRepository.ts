import { Booking } from '../models/Booking';
import { IRepository } from './IRepository';

const bookings: Booking[] = [];

export class BookingRepository implements IRepository<Booking> {
  async findAll(): Promise<Booking[]> {
    return bookings;
  }

  async findById(id: string): Promise<Booking | null> {
    const booking = bookings.find(b => b.id === id);
    return booking || null;
  }

  async findByUserId(userId: string): Promise<Booking[]> {
    return bookings.filter(b => b.userId === userId);
  }

  async create(booking: Booking): Promise<Booking> {
    bookings.push(booking);
    return booking;
  }

  async update(id: string, item: Partial<Booking>): Promise<Booking | null> {
    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) return null;
    
    bookings[index] = { ...bookings[index], ...item };
    return bookings[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) return false;
    
    bookings.splice(index, 1);
    return true;
  }
}
