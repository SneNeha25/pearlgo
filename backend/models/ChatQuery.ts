export interface ChatQuery {
  id: string;
  userId?: string;
  queryText: string;
  intentDetected: string | null;
  responseGiven?: string;
  timestamp: Date;
  status: 'ANSWERED' | 'UNKNOWN';
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}
