// User Types
export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

// Course/Playlist Types
export interface Course {
  id: string;
  user_id: string;
  playlist_id: string;
  playlist_url: string;
  title: string;
  description?: string;
  thumbnail_url?: string;
  channel_name: string;
  channel_id: string;
  video_count: number;
  total_duration?: string;
  status: CourseStatus;
  created_at: string;
  updated_at: string;
}

export type CourseStatus = 'pending' | 'processing' | 'completed' | 'failed';

// Video Types
export interface Video {
  id: string;
  course_id: string;
  video_id: string;
  title: string;
  description?: string;
  thumbnail_url?: string;
  duration: string;
  position: number;
  transcript?: string;
  summary?: string;
  status: VideoStatus;
  created_at: string;
  updated_at: string;
}

export type VideoStatus = 'pending' | 'transcribing' | 'summarizing' | 'completed' | 'failed';

// Summary Types
export interface Summary {
  id: string;
  video_id: string;
  course_id: string;
  content: string;
  key_points: string[];
  timestamps?: SummaryTimestamp[];
  created_at: string;
  updated_at: string;
}

export interface SummaryTimestamp {
  time: string;
  text: string;
}

// AI Types
export interface AIRequest {
  model: string;
  messages: AIMessage[];
  max_tokens?: number;
  temperature?: number;
}

export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIResponse {
  id: string;
  choices: AIChoice[];
  usage: AIUsage;
}

export interface AIChoice {
  message: AIMessage;
  finish_reason: string;
}

export interface AIUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

// Subscription Types
export interface Subscription {
  id: string;
  user_id: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  current_period_start: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
}

export type SubscriptionPlan = 'free' | 'pro' | 'enterprise';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing';

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// Pagination Types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}
