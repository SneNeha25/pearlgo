import { TourPackage } from '../models/TourPackage';
import { FAQ, ChatQuery } from '../models/ChatQuery';
import { Booking } from '../models/Booking';
import { PackageRepository } from '../repositories/PackageRepository';
import { QueryRepository } from '../repositories/QueryRepository';
import { BookingRepository } from '../repositories/BookingRepository';

export class AdminService {
  private packageRepository: PackageRepository;
  private queryRepository: QueryRepository;
  private bookingRepository: BookingRepository;

  constructor() {
    this.packageRepository = new PackageRepository();
    this.queryRepository = new QueryRepository();
    this.bookingRepository = new BookingRepository();
  }

  // Requirement 1: Admin manage travel packages
  async getAllPackages(): Promise<TourPackage[]> {
    return this.packageRepository.findAll();
  }

  async addPackage(pkgData: Omit<TourPackage, 'id' | 'createdAt'>): Promise<TourPackage> {
    const newPackage: TourPackage = {
      ...pkgData,
      id: crypto.randomUUID(),
      createdAt: new Date()
    };
    return this.packageRepository.create(newPackage);
  }

  async updatePackage(id: string, updates: Partial<TourPackage>): Promise<TourPackage | null> {
    return this.packageRepository.update(id, updates);
  }

  async deletePackage(id: string): Promise<boolean> {
    return this.packageRepository.delete(id);
  }

  // Requirement 2: Admin manage chatbot data (FAQs & review unknown queries)
  async getAllFAQs(): Promise<FAQ[]> {
    return this.queryRepository.getAllFAQs();
  }

  async addFAQ(question: string, answer: string, category?: string): Promise<FAQ> {
    const newFAQ: FAQ = {
      id: crypto.randomUUID(),
      question,
      answer,
      category
    };
    return this.queryRepository.addFAQ(newFAQ);
  }

  async updateFAQ(id: string, updates: Partial<FAQ>): Promise<boolean> {
    return this.queryRepository.updateFAQ(id, updates);
  }

  async deleteFAQ(id: string): Promise<boolean> {
    return this.queryRepository.deleteFAQ(id);
  }

  async getUnknownQueries(): Promise<ChatQuery[]> {
    return this.queryRepository.findUnknownQueries();
  }

  async resolveUnknownQuery(queryId: string, answerToProvide: string): Promise<boolean> {
    const query = await this.queryRepository.findById(queryId);
    if (!query) return false;

    // We can simultaneously convert this to an FAQ if needed, but for now just mark it answered
    await this.queryRepository.update(queryId, { 
      status: 'ANSWERED', 
      responseGiven: answerToProvide 
    });

    // Optionally add to FAQs automatically
    await this.addFAQ(query.queryText, answerToProvide, 'Learned');

    return true;
  }

  // Requirement 3: Admin manage user bookings
  async getAllBookings(): Promise<Booking[]> {
    return this.bookingRepository.findAll();
  }

  async confirmBooking(bookingId: string): Promise<Booking | null> {
    return this.bookingRepository.update(bookingId, { status: 'CONFIRMED' });
  }

  async cancelBooking(bookingId: string): Promise<Booking | null> {
    return this.bookingRepository.update(bookingId, { status: 'CANCELLED' });
  }
}
