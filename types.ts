
export enum AppStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  DESIGNING = 'DESIGNING',
  CODING = 'CODING',
  TESTING = 'TESTING',
  PREVIEW = 'PREVIEW',
  PAYMENT = 'PAYMENT',
  READY = 'READY'
}

export interface AIAgent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface AppConfig {
  description: string;
  features: string[];
  techStack: string[];
  designSpecs: string;
}
