import { NextRequest, NextResponse } from 'next/server';
import { AdminService } from '@/backend/services/AdminService';
import { PackageRepository } from '@/backend/repositories/PackageRepository';

const adminService = new AdminService();
const packageRepository = new PackageRepository();

// GET /api/admin/packages - Get all packages
export async function GET() {
  try {
    const packages = await packageRepository.findAll();
    return NextResponse.json(packages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
  }
}

// POST /api/admin/packages - Create new package
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newPackage = await adminService.addPackage(body);
    return NextResponse.json(newPackage, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create package' }, { status: 500 });
  }
}
