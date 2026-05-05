import { NextRequest, NextResponse } from 'next/server';
import { AdminService } from '@/backend/services/AdminService';

const adminService = new AdminService();

// GET /api/admin/packages/[id] - Get package by ID
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const packageRepository = (await import('@/backend/repositories/PackageRepository')).PackageRepository;
    const repo = new packageRepository();
    const pkg = await repo.findById(id);

    if (!pkg) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }

    return NextResponse.json(pkg);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch package' }, { status: 500 });
  }
}

// PUT /api/admin/packages/[id] - Update package
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updatedPackage = await adminService.updatePackage(id, body);

    if (!updatedPackage) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }

    return NextResponse.json(updatedPackage);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update package' }, { status: 500 });
  }
}

// DELETE /api/admin/packages/[id] - Delete package
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const success = await adminService.deletePackage(id);

    if (!success) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Package deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete package' }, { status: 500 });
  }
}
