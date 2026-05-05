import { NextRequest, NextResponse } from 'next/server';
import { QueryRepository } from '@/backend/repositories/QueryRepository';

const queryRepository = new QueryRepository();

// PUT /api/admin/faqs/[id] - Update FAQ
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const success = await queryRepository.updateFAQ(id, body);

    if (!success) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    }

    const updatedFAQ = await queryRepository.getFAQById(id);
    return NextResponse.json(updatedFAQ);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update FAQ' }, { status: 500 });
  }
}

// DELETE /api/admin/faqs/[id] - Delete FAQ
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const success = await queryRepository.deleteFAQ(id);

    if (!success) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 });
  }
}
