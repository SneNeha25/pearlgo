import { TourPackage } from '../models/TourPackage';
import { PackageRepository } from '../repositories/PackageRepository';

export class TravelService {
  private packageRepository: PackageRepository;

  constructor() {
    this.packageRepository = new PackageRepository();
  }

  // Requirement 5 & 6: Display available tour packages & provide info on destinations
  async getAllPackages(): Promise<TourPackage[]> {
    return this.packageRepository.findAll();
  }

  // Requirement 7: Search for packages based on budget and location
  async searchPackages(budget?: number, location?: string): Promise<TourPackage[]> {
    let results = await this.packageRepository.findAll();

    if (budget) {
      results = results.filter(p => p.price <= budget);
    }

    if (location) {
      results = results.filter(p => 
        p.destination.toLowerCase().includes(location.toLowerCase())
      );
    }

    return results;
  }

  // Requirement 8: Provide travel recommendations based on user preferences
  async getRecommendations(preferences: string[]): Promise<TourPackage[]> {
    const allPackages = await this.packageRepository.findAll();
    
    if (!preferences || preferences.length === 0) {
      return allPackages; // Return all if no specific preferences
    }

    // Simple recommendation logic based on matching tags
    return allPackages.filter(pkg => 
      pkg.tags?.some(tag => preferences.includes(tag))
    );
  }
}
