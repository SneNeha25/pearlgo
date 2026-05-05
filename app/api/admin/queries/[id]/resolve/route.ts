import { NextRequest, NextResponse } from 'next/server';
import { AdminService } from '@/backend/services/AdminService';

const adminService = new AdminService();

// PUT /api/admin/queries/[id]/resolve - Resolve unknown query
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { answer } = body;

    const success = await adminService.resolveUnknownQuery(id, answer);

    if (!success) {
      return NextResponse.json({ error: 'Query not found or already resolved' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Query resolved successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to resolve query' }, { status: 500 });
  }
}
