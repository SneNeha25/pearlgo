import { User } from '../models/User';
import { IRepository } from './IRepository';
import { db } from '../firebase';
import { ref, get, set, update, remove, child } from 'firebase/database';

export class UserRepository implements IRepository<User> {
  private usersRef = ref(db, 'users');

  private parseDates(user: any): User {
    if (user && user.createdAt) {
      user.createdAt = new Date(user.createdAt);
    }
    return user as User;
  }

  async findAll(): Promise<User[]> {
    const snapshot = await get(this.usersRef);
    if (!snapshot.exists()) return [];
    
    const usersObj = snapshot.val();
    return Object.values(usersObj).map((u: any) => this.parseDates(u));
  }

  async findById(id: string): Promise<User | null> {
    const userRef = child(this.usersRef, id);
    const snapshot = await get(userRef);
    if (!snapshot.exists()) return null;
    return this.parseDates(snapshot.val());
  }

  async findByEmail(email: string): Promise<User | null> {
    const users = await this.findAll();
    return users.find(u => u.email === email) || null;
  }

  async create(user: User): Promise<User> {
    const userRef = child(this.usersRef, user.id);
    const userToSave = { ...user, createdAt: user.createdAt.toISOString() };
    await set(userRef, userToSave);
    return user;
  }

  async update(id: string, item: Partial<User>): Promise<User | null> {
    const userRef = child(this.usersRef, id);
    const snapshot = await get(userRef);
    if (!snapshot.exists()) return null;
    
    const updateData: any = { ...item };
    if (updateData.createdAt instanceof Date) {
       updateData.createdAt = updateData.createdAt.toISOString();
    }
    
    await update(userRef, updateData);
    
    const updatedSnapshot = await get(userRef);
    return this.parseDates(updatedSnapshot.val());
  }

  async delete(id: string): Promise<boolean> {
    const userRef = child(this.usersRef, id);
    const snapshot = await get(userRef);
    if (!snapshot.exists()) return false;
    
    await remove(userRef);
    return true;
  }
}
