import { ChatQuery, FAQ } from '../models/ChatQuery';
import { IRepository } from './IRepository';
import { db } from '../firebase';
import { ref, get, set, update, remove, child } from 'firebase/database';

export class QueryRepository implements IRepository<ChatQuery> {
  private queriesRef = ref(db, 'chatQueries');
  private faqsRef = ref(db, 'faqs');

  private parseDates(query: any): ChatQuery {
    if (query && query.timestamp) {
      query.timestamp = new Date(query.timestamp);
    }
    return query as ChatQuery;
  }

  async findAll(): Promise<ChatQuery[]> {
    const snapshot = await get(this.queriesRef);
    if (!snapshot.exists()) return [];
    
    const queriesObj = snapshot.val();
    return Object.values(queriesObj).map((q: any) => this.parseDates(q));
  }

  async findById(id: string): Promise<ChatQuery | null> {
    const queryRef = child(this.queriesRef, id);
    const snapshot = await get(queryRef);
    if (!snapshot.exists()) return null;
    return this.parseDates(snapshot.val());
  }

  async findUnknownQueries(): Promise<ChatQuery[]> {
    const queries = await this.findAll();
    return queries.filter((q) => q.status === 'UNKNOWN');
  }

  async create(query: ChatQuery): Promise<ChatQuery> {
    const queryRef = child(this.queriesRef, query.id);
    const queryToSave = { ...query, timestamp: query.timestamp.toISOString() };
    await set(queryRef, queryToSave);
    return query;
  }

  async update(id: string, item: Partial<ChatQuery>): Promise<ChatQuery | null> {
    const queryRef = child(this.queriesRef, id);
    const snapshot = await get(queryRef);
    if (!snapshot.exists()) return null;

    const updateData: any = { ...item };
    if (updateData.timestamp instanceof Date) {
       updateData.timestamp = updateData.timestamp.toISOString();
    }

    await update(queryRef, updateData);
    
    const updatedSnapshot = await get(queryRef);
    return this.parseDates(updatedSnapshot.val());
  }

  async delete(id: string): Promise<boolean> {
    const queryRef = child(this.queriesRef, id);
    const snapshot = await get(queryRef);
    if (!snapshot.exists()) return false;

    await remove(queryRef);
    return true;
  }

  // Specific methods for FAQs
  async getAllFAQs(): Promise<FAQ[]> {
    const snapshot = await get(this.faqsRef);
    if (!snapshot.exists()) return [];
    
    const faqsObj = snapshot.val();
    return Object.values(faqsObj);
  }

  async getFAQById(id: string): Promise<FAQ | null> {
    const faqRef = child(this.faqsRef, id);
    const snapshot = await get(faqRef);
    if (!snapshot.exists()) return null;
    return snapshot.val() as FAQ;
  }

  async addFAQ(faq: FAQ): Promise<FAQ> {
    const faqRef = child(this.faqsRef, faq.id);
    await set(faqRef, faq);
    return faq;
  }

  async updateFAQ(id: string, updates: Partial<FAQ>): Promise<boolean> {
    const faqRef = child(this.faqsRef, id);
    const snapshot = await get(faqRef);
    if (!snapshot.exists()) return false;

    await update(faqRef, updates);
    return true;
  }

  async deleteFAQ(id: string): Promise<boolean> {
    const faqRef = child(this.faqsRef, id);
    const snapshot = await get(faqRef);
    if (!snapshot.exists()) return false;

    await remove(faqRef);
    return true;
  }
}
