import type { AIRequest, AIResponse } from '@/types';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function createCompletion(request: AIRequest): Promise<AIResponse> {
    const response = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
            'X-Title': 'TubeCourse',
        },
        body: JSON.stringify({
            model: request.model,
            messages: request.messages,
            max_tokens: request.max_tokens || 4096,
            temperature: request.temperature || 0.7,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create completion');
    }

    return response.json();
}

// Available models for different tasks
export const AI_MODELS = {
    // Fast & affordable for summarization
    SUMMARY: 'openai/gpt-4o-mini',
    // More capable for complex analysis
    ANALYSIS: 'openai/gpt-4o',
    // Alternative models
    CLAUDE: 'anthropic/claude-3.5-sonnet',
    GEMINI: 'google/gemini-2.0-flash-001',
} as const;

export type AIModel = typeof AI_MODELS[keyof typeof AI_MODELS];
