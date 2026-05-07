import { NextRequest, NextResponse } from 'next/server';
import type { ChatbotService as ChatbotServiceType } from '@/backend/services/ChatbotService';

export async function POST(req: NextRequest) {
  console.log('[API] Chat request received');
  
  try {
    const { query, userId } = await req.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // Lazy load the service to prevent crashes if TFJS fails to load on startup
    let chatbotService: ChatbotServiceType;
    try {
      const { ChatbotService } = await import('@/backend/services/ChatbotService');
      
      if (!(global as any).chatbotService) {
        console.log('[API] Initializing ChatbotService singleton...');
        (global as any).chatbotService = new ChatbotService();
      }
      chatbotService = (global as any).chatbotService;
    } catch (importError) {
      console.error('[API] Failed to load ChatbotService:', importError);
      return NextResponse.json({ 
        response: "I'm having trouble starting my AI engine. Please check the server terminal for errors." 
      });
    }

    const response = await chatbotService.processQuery(userId, query);
    return NextResponse.json({ response });
    
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ 
      response: "System error: " + (error.message || "Unknown error")
    });
  }
}
