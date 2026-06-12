export type Language = 'javascript' | 'typescript' | 'python' | 'java' | 'cpp' | 'go' | 'rust';

export type ReviewPersona = 'senior-dev' | 'security-auditor' | 'performance-engineer';

export interface ReviewIssue {
  type: 'bug' | 'security' | 'performance' | 'style';
  severity: 'critical' | 'warning' | 'info';
  line?: number;
  message: string;
  suggestion: string;
}

export interface CodeReview {
  id: string;
  code: string;
  language: Language;
  persona: ReviewPersona;
  summary: string;
  issues: ReviewIssue[];
  improvedCode: string;
  timestamp: Date;
  loading?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
