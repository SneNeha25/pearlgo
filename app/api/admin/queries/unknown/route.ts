import { NextRequest, NextResponse } from 'next/server';
import { AdminService } from '@/backend/services/AdminService';

const adminService = new AdminService();

// GET /api/admin/queries/unknown - Get unknown queries
export async function GET() {
  try {
    const unknownQueries = await adminService.getUnknownQueries();
    return NextResponse.json(unknownQueries);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch unknown queries' }, { status: 500 });
  }
}
