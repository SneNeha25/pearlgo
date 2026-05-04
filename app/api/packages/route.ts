import { NextResponse } from 'next/server';
import { TravelService } from '../../../backend/services/TravelService';

// Initialize the service once (or per request depending on architecture, 
// here it's fine outside for an in-memory mock to persist data across calls in dev mode)
const travelService = new TravelService();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const budget = searchParams.get('budget');
    const location = searchParams.get('location');

    let packages;

    if (budget || location) {
      packages = await travelService.searchPackages(
        budget ? parseFloat(budget) : undefined,
        location ? location : undefined
      );
    } else {
      packages = await travelService.getAllPackages();
    }

    return NextResponse.json({ success: true, data: packages }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
