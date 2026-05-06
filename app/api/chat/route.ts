import { NextRequest, NextResponse } from 'next/server';
import { ChatbotService } from '@/backend/services/ChatbotService';

const chatbotService = new ChatbotService();

export async function POST(req: NextRequest) {
  try {
    const { query, userId } = await req.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const response = await chatbotService.processQuery(userId, query);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Failed to process query' }, { status: 500 });
  }
}
