import { TourPackage } from '../models/TourPackage';
import { IRepository } from './IRepository';

// Mock in-memory database
const packages: TourPackage[] = [
  {
    id: '1',
    title: 'Beach Getaway',
    description: 'Relax on the sunny beaches of Malibu.',
    destination: 'Malibu, CA',
    price: 1200,
    durationDays: 5,
    availableSeats: 10,
    tags: ['beach', 'relaxation', 'luxury'],
    createdAt: new Date()
  },
  {
    id: '2',
    title: 'Mountain Adventure',
    description: 'Hike the Rockies and camp under the stars.',
    destination: 'Colorado',
    price: 800,
    durationDays: 3,
    availableSeats: 15,
    tags: ['adventure', 'mountain', 'budget'],
    createdAt: new Date()
  }
];

export class PackageRepository implements IRepository<TourPackage> {
  async findAll(): Promise<TourPackage[]> {
    return packages;
  }

  async findById(id: string): Promise<TourPackage | null> {
    const pkg = packages.find(p => p.id === id);
    return pkg || null;
  }

  async findByBudget(maxPrice: number): Promise<TourPackage[]> {
    return packages.filter(p => p.price <= maxPrice);
  }

  async findByLocation(location: string): Promise<TourPackage[]> {
    return packages.filter(p => p.destination.toLowerCase().includes(location.toLowerCase()));
  }

  async create(pkg: TourPackage): Promise<TourPackage> {
    packages.push(pkg);
    return pkg;
  }

  async update(id: string, item: Partial<TourPackage>): Promise<TourPackage | null> {
    const index = packages.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    packages[index] = { ...packages[index], ...item };
    return packages[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = packages.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    packages.splice(index, 1);
    return true;
  }
}
