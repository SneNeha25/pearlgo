import { NextRequest, NextResponse } from 'next/server';
import { AdminService } from '@/backend/services/AdminService';
import { QueryRepository } from '@/backend/repositories/QueryRepository';

const adminService = new AdminService();
const queryRepository = new QueryRepository();

// GET /api/admin/faqs - Get all FAQs
export async function GET() {
  try {
    const faqs = await queryRepository.getAllFAQs();
    return NextResponse.json(faqs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
  }
}

// POST /api/admin/faqs - Create new FAQ
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newFAQ = await adminService.addFAQ(body.question, body.answer, body.category);
    return NextResponse.json(newFAQ, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
  }
}
