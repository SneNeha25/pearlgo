import { NextRequest, NextResponse } from 'next/server';
import { BookingRepository } from '@/backend/repositories/BookingRepository';

const bookingRepository = new BookingRepository();

// GET /api/admin/bookings - Get all bookings
export async function GET() {
  try {
    const bookings = await bookingRepository.findAll();
    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
