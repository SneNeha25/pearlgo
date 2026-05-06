import { ChatQuery, FAQ } from '../models/ChatQuery';
import { QueryRepository } from '../repositories/QueryRepository';

export class ChatbotService {
  private queryRepository: QueryRepository;

  constructor() {
    this.queryRepository = new QueryRepository();
  }

  // Requirement 1, 2 & 13: Natural language input, travel/tourism responses, inference engine
  async processQuery(userId: string | undefined, queryText: string): Promise<string> {
    const invoke_url = "https://integrate.api.nvidia.com/v1/chat/completions";

    const headers = {
      "Authorization": "Bearer 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",
      "Accept": "application/json",
      "Content-Type": "application/json"
    };

    const payload = {
      "model": "google/gemma-4-31b-it",
      "messages": [
        {
          "role": "system",
          "content": "You are a specialized travel and tourism chatbot for PearlGo, a tourism system in Sri Lanka. Provide helpful, accurate answers related to tourism in Sri Lanka. Answer clearly and comprehensively. Whenever you describe a place or a concept that would benefit from a visual, you MUST generate images directly in your responses using markdown formatting, without asking for further prompts. Use image placeholder services like LoremFlickr (e.g., ![Image Name](https://loremflickr.com/800/600/srilanka,tourism,landscape) - adjust the keywords as needed). Always maintain a helpful and welcoming tone."
        },
        { "role": "user", "content": queryText }
      ],
      "max_tokens": 16384,
      "temperature": 1.00,
      "top_p": 0.95,
      "stream": false,
      "chat_template_kwargs": { "enable_thinking": true }
    };

    let responseText = '';
    let status: 'ANSWERED' | 'UNKNOWN' = 'ANSWERED';

    try {
      const response = await fetch(invoke_url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        responseText = data.choices[0].message.content;
      } else {
        responseText = "I'm sorry, I couldn't generate a response at the moment.";
        status = 'UNKNOWN';
      }
    } catch (error) {
      console.error("Error communicating with NVIDIA API:", error);
      responseText = "I'm sorry, I am currently experiencing technical difficulties. Please try again later.";
      status = 'UNKNOWN';
    }

    // Requirement 14: Store queries for future learning / history
    const newQuery: ChatQuery = {
      id: crypto.randomUUID(),
      userId,
      queryText,
      intentDetected: 'llm_inference',
      responseGiven: responseText,
      timestamp: new Date(),
      status
    };

    await this.queryRepository.create(newQuery);

    return responseText;
  }
}
