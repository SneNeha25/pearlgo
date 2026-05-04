import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  // Requirement 3: User registration
  async register(name: string, email: string, passwordHash: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser: User = {
      id: crypto.randomUUID(), // Simple unique ID generator
      name,
      email,
      passwordHash,
      role: 'USER',
      createdAt: new Date(),
    };

    return this.userRepository.create(newUser);
  }

  // Requirement 3: User login
  async login(email: string, passwordHash: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (user && user.passwordHash === passwordHash) {
      return user; // Success
    }
    return null; // Failure
  }

  // Requirement 4: Store and manage user profile information
  async updateProfile(userId: string, updates: Partial<User>): Promise<User | null> {
    return this.userRepository.update(userId, updates);
  }

  async getProfile(userId: string): Promise<User | null> {
    return this.userRepository.findById(userId);
  }
}
