import { ChatQuery, FAQ } from '../models/ChatQuery';
import { QueryRepository } from '../repositories/QueryRepository';

export class ChatbotService {
  private queryRepository: QueryRepository;

  constructor() {
    this.queryRepository = new QueryRepository();
  }

  // Requirement 1, 2 & 13: Natural language input, travel/tourism responses, inference engine
  async processQuery(userId: string | undefined, queryText: string): Promise<string> {
    const intent = this.detectIntent(queryText);
    let responseText = '';
    let status: 'ANSWERED' | 'UNKNOWN' = 'ANSWERED';

    if (intent === 'booking') {
      responseText = 'To make a booking, please navigate to the Packages section, select a package, and click "Book Now".';
    } else if (intent === 'faq') {
      responseText = await this.answerFAQ(queryText);
      if (responseText === 'Unknown') {
        responseText = "I'm sorry, I don't have an answer to that specific question yet. Our support team will update me soon!";
        status = 'UNKNOWN';
      }
    } else if (intent === 'greeting') {
      responseText = 'Hello! How can I assist you with your travel plans today?';
    } else {
      responseText = "I'm sorry, I couldn't understand your request. I have logged this so my team can teach me to help you better next time.";
      status = 'UNKNOWN';
    }

    // Requirement 14: Store unknown queries for future learning
    const newQuery: ChatQuery = {
      id: crypto.randomUUID(),
      userId,
      queryText,
      intentDetected: intent,
      responseGiven: responseText,
      timestamp: new Date(),
      status
    };
    
    await this.queryRepository.create(newQuery);

    return responseText;
  }

  // Simple rule-based intent detection mock
  private detectIntent(text: string): string | null {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('book') || lowerText.includes('reserve')) return 'booking';
    if (lowerText.includes('hello') || lowerText.includes('hi')) return 'greeting';
    if (lowerText.includes('how') || lowerText.includes('what') || lowerText.includes('where')) return 'faq';
    return null;
  }

  // Requirement 12: Answer FAQs
  private async answerFAQ(text: string): Promise<string> {
    const faqs = await this.queryRepository.getAllFAQs();
    const lowerText = text.toLowerCase();
    
    // Simple matching
    for (const faq of faqs) {
      // Basic keyword match
      const keywords = faq.question.toLowerCase().split(' ').filter(w => w.length > 3);
      const isMatch = keywords.some(k => lowerText.includes(k));
      if (isMatch) return faq.answer;
    }
    
    return 'Unknown';
  }
}
