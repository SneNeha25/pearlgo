import { TourPackage } from '../models/TourPackage';
import { IRepository } from './IRepository';
import { db } from '../firebase';
import { ref, get, set, update, remove, child } from 'firebase/database';

export class PackageRepository implements IRepository<TourPackage> {
  private packagesRef = ref(db, 'tourPackages');

  private parseDates(pkg: any): TourPackage {
    if (pkg && pkg.createdAt) {
      pkg.createdAt = new Date(pkg.createdAt);
    }
    return pkg as TourPackage;
  }

  async findAll(): Promise<TourPackage[]> {
    const snapshot = await get(this.packagesRef);
    if (!snapshot.exists()) return [];
    
    const packagesObj = snapshot.val();
    return Object.values(packagesObj).map((p: any) => this.parseDates(p));
  }

  async findById(id: string): Promise<TourPackage | null> {
    const pkgRef = child(this.packagesRef, id);
    const snapshot = await get(pkgRef);
    if (!snapshot.exists()) return null;
    return this.parseDates(snapshot.val());
  }

  async findByBudget(maxPrice: number): Promise<TourPackage[]> {
    const packages = await this.findAll();
    return packages.filter(p => p.price <= maxPrice);
  }

  async findByLocation(location: string): Promise<TourPackage[]> {
    const packages = await this.findAll();
    return packages.filter(p => p.destination.toLowerCase().includes(location.toLowerCase()));
  }

  async create(pkg: TourPackage): Promise<TourPackage> {
    const pkgRef = child(this.packagesRef, pkg.id);
    const pkgToSave = { ...pkg, createdAt: pkg.createdAt.toISOString() };
    await set(pkgRef, pkgToSave);
    return pkg;
  }

  async update(id: string, item: Partial<TourPackage>): Promise<TourPackage | null> {
    const pkgRef = child(this.packagesRef, id);
    const snapshot = await get(pkgRef);
    if (!snapshot.exists()) return null;
    
    const updateData: any = { ...item };
    if (updateData.createdAt instanceof Date) {
       updateData.createdAt = updateData.createdAt.toISOString();
    }
    
    await update(pkgRef, updateData);
    
    const updatedSnapshot = await get(pkgRef);
    return this.parseDates(updatedSnapshot.val());
  }

  async delete(id: string): Promise<boolean> {
    const pkgRef = child(this.packagesRef, id);
    const snapshot = await get(pkgRef);
    if (!snapshot.exists()) return false;
    
    await remove(pkgRef);
    return true;
  }
}
