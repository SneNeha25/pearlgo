import { NextResponse } from 'next/server';
import { ChatbotService } from '../../../backend/services/ChatbotService';

const chatbotService = new ChatbotService();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { queryText, userId } = body;

    if (!queryText) {
      return NextResponse.json({ success: false, error: 'Query text is required' }, { status: 400 });
    }

    const responseText = await chatbotService.processQuery(userId, queryText);

    return NextResponse.json({ success: true, reply: responseText }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
