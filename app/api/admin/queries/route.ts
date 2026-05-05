import { NextRequest, NextResponse } from 'next/server';
import { QueryRepository } from '@/backend/repositories/QueryRepository';

const queryRepository = new QueryRepository();

// GET /api/admin/queries - Get all queries
export async function GET() {
  try {
    const queries = await queryRepository.findAll();
    return NextResponse.json(queries);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch queries' }, { status: 500 });
  }
}
