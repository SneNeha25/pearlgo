import { Booking } from '../models/Booking';
import { IRepository } from './IRepository';
import { db } from '../firebase';
import { ref, get, set, update, remove, child } from 'firebase/database';

export class BookingRepository implements IRepository<Booking> {
  private bookingsRef = ref(db, 'bookings');

  private parseDates(booking: any): Booking {
    if (booking && booking.bookingDate) {
      booking.bookingDate = new Date(booking.bookingDate);
    }
    return booking as Booking;
  }

  async findAll(): Promise<Booking[]> {
    const snapshot = await get(this.bookingsRef);
    if (!snapshot.exists()) return [];
    
    const bookingsObj = snapshot.val();
    return Object.values(bookingsObj).map((b: any) => this.parseDates(b));
  }

  async findById(id: string): Promise<Booking | null> {
    const bookingRef = child(this.bookingsRef, id);
    const snapshot = await get(bookingRef);
    if (!snapshot.exists()) return null;
    return this.parseDates(snapshot.val());
  }

  async findByUserId(userId: string): Promise<Booking[]> {
    const bookings = await this.findAll();
    return bookings.filter(b => b.userId === userId);
  }

  async create(booking: Booking): Promise<Booking> {
    const bookingRef = child(this.bookingsRef, booking.id);
    const bookingToSave = { ...booking, bookingDate: booking.bookingDate.toISOString() };
    await set(bookingRef, bookingToSave);
    return booking;
  }

  async update(id: string, item: Partial<Booking>): Promise<Booking | null> {
    const bookingRef = child(this.bookingsRef, id);
    const snapshot = await get(bookingRef);
    if (!snapshot.exists()) return null;
    
    const updateData: any = { ...item };
    if (updateData.bookingDate instanceof Date) {
       updateData.bookingDate = updateData.bookingDate.toISOString();
    }
    
    await update(bookingRef, updateData);
    
    const updatedSnapshot = await get(bookingRef);
    return this.parseDates(updatedSnapshot.val());
  }

  async delete(id: string): Promise<boolean> {
    const bookingRef = child(this.bookingsRef, id);
    const snapshot = await get(bookingRef);
    if (!snapshot.exists()) return false;
    
    await remove(bookingRef);
    return true;
  }
}
