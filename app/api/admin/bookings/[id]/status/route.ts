import { NextRequest, NextResponse } from 'next/server';
import { BookingRepository } from '@/backend/repositories/BookingRepository';

const bookingRepository = new BookingRepository();

// PUT /api/admin/bookings/[id]/status - Update booking status
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!['PENDING', 'CONFIRMED', 'CANCELLED'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const updatedBooking = await bookingRepository.update(id, { status });

    if (!updatedBooking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json(updatedBooking);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update booking status' }, { status: 500 });
  }
}
