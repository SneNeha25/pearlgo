import { ChatQuery, FAQ } from '../models/ChatQuery';
import { IRepository } from './IRepository';

const queries: ChatQuery[] = [];

const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How do I cancel my booking?',
    answer: 'You can cancel your booking by visiting your profile page and clicking "Cancel" next to the booking.',
    category: 'Booking',
  },
  {
    id: '2',
    question: 'What payment methods are accepted?',
    answer: 'We accept Visa, MasterCard, and PayPal.',
    category: 'Payment',
  },
];

export class QueryRepository implements IRepository<ChatQuery> {
  async findAll(): Promise<ChatQuery[]> {
    return queries;
  }

  async findById(id: string): Promise<ChatQuery | null> {
    const query = queries.find((q) => q.id === id);
    return query || null;
  }

  async findUnknownQueries(): Promise<ChatQuery[]> {
    return queries.filter((q) => q.status === 'UNKNOWN');
  }

  async create(query: ChatQuery): Promise<ChatQuery> {
    queries.push(query);
    return query;
  }

  async update(id: string, item: Partial<ChatQuery>): Promise<ChatQuery | null> {
    const index = queries.findIndex((q) => q.id === id);
    if (index === -1) return null;

    queries[index] = { ...queries[index], ...item };
    return queries[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = queries.findIndex((q) => q.id === id);
    if (index === -1) return false;

    queries.splice(index, 1);
    return true;
  }

  // Specific methods for FAQs
  async getAllFAQs(): Promise<FAQ[]> {
    return faqs;
  }

  async getFAQById(id: string): Promise<FAQ | null> {
    const faq = faqs.find((f) => f.id === id);
    return faq || null;
  }

  async addFAQ(faq: FAQ): Promise<FAQ> {
    faqs.push(faq);
    return faq;
  }

  async updateFAQ(id: string, updates: Partial<FAQ>): Promise<boolean> {
    const index = faqs.findIndex((f) => f.id === id);
    if (index === -1) return false;

    faqs[index] = { ...faqs[index], ...updates };
    return true;
  }

  async deleteFAQ(id: string): Promise<boolean> {
    const index = faqs.findIndex((f) => f.id === id);
    if (index === -1) return false;

    faqs.splice(index, 1);
    return true;
  }
}
