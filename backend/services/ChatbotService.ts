import { ChatQuery } from '../models/ChatQuery';
import { QueryRepository } from '../repositories/QueryRepository';
import { TensorflowService } from './TensorflowService';

export class ChatbotService {
  private queryRepository: QueryRepository;
  private tfService: TensorflowService;

  constructor() {
    console.log('[ChatbotService] Initializing...');
    this.queryRepository = new QueryRepository();
    this.tfService = new TensorflowService();
  }

  // Requirement 1, 2 & 13: Natural language input, travel/tourism responses, inference engine
  // Now powered by local TensorFlow.js instead of external APIs
  async processQuery(userId: string | undefined, queryText: string): Promise<string> {
    let responseText = '';
    let status: 'ANSWERED' | 'UNKNOWN' = 'ANSWERED';

    try {
      // Local inference using TensorFlow
      responseText = await this.tfService.predict(queryText);
    } catch (error) {
      console.error("Error during local TensorFlow inference:", error);
      responseText = "I'm sorry, I am currently experiencing technical difficulties. Please try again later.";
      status = 'UNKNOWN';
    }

    // Requirement 14: Store queries for future learning / history
    const newQuery: ChatQuery = {
      id: crypto.randomUUID(),
      userId: userId || 'anonymous', // Default to 'anonymous' if no userId is provided
      queryText,
      intentDetected: 'tfjs_local_inference',
      responseGiven: responseText,
      timestamp: new Date(),
      status
    };

    await this.queryRepository.create(newQuery);

    return responseText;
  }
}
