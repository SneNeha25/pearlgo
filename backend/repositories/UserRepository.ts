import { User } from '../models/User';
import { IRepository } from './IRepository';

// Mock in-memory database
const users: User[] = [];

export class UserRepository implements IRepository<User> {
  async findAll(): Promise<User[]> {
    return users;
  }

  async findById(id: string): Promise<User | null> {
    const user = users.find(u => u.id === id);
    return user || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = users.find(u => u.email === email);
    return user || null;
  }

  async create(user: User): Promise<User> {
    users.push(user);
    return user;
  }

  async update(id: string, item: Partial<User>): Promise<User | null> {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;
    
    users[index] = { ...users[index], ...item };
    return users[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return false;
    
    users.splice(index, 1);
    return true;
  }
}
