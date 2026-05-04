import { TourPackage } from '../models/TourPackage';
import { FAQ, ChatQuery } from '../models/ChatQuery';
import { PackageRepository } from '../repositories/PackageRepository';
import { QueryRepository } from '../repositories/QueryRepository';

export class AdminService {
  private packageRepository: PackageRepository;
  private queryRepository: QueryRepository;

  constructor() {
    this.packageRepository = new PackageRepository();
    this.queryRepository = new QueryRepository();
  }

  // Requirement 15: Admin manage travel packages
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

  // Requirement 15: Admin manage chatbot data (FAQs & review unknown queries)
  async addFAQ(question: string, answer: string, category?: string): Promise<FAQ> {
    const newFAQ: FAQ = {
      id: crypto.randomUUID(),
      question,
      answer,
      category
    };
    return this.queryRepository.addFAQ(newFAQ);
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
}
