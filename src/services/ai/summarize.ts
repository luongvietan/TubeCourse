import { createCompletion, AI_MODELS } from '@/lib/openrouter/client';
import type { Summary } from '@/types';

const SUMMARY_SYSTEM_PROMPT = `You are an expert at summarizing educational video content. Your task is to:
1. Create a concise yet comprehensive summary of the video transcript
2. Extract key points and main takeaways
3. Identify important timestamps if provided
4. Use clear, professional language

Format your response as JSON with the following structure:
{
  "content": "The main summary text",
  "key_points": ["Point 1", "Point 2", ...],
  "timestamps": [{"time": "00:00", "text": "Topic discussed"}, ...]
}`;

export async function summarizeVideo(
    transcript: string,
    videoTitle: string
): Promise<Omit<Summary, 'id' | 'video_id' | 'course_id' | 'created_at' | 'updated_at'>> {
    const response = await createCompletion({
        model: AI_MODELS.SUMMARY,
        messages: [
            { role: 'system', content: SUMMARY_SYSTEM_PROMPT },
            {
                role: 'user',
                content: `Please summarize the following video titled "${videoTitle}":\n\n${transcript}`,
            },
        ],
        temperature: 0.3,
        max_tokens: 2048,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
        throw new Error('No summary generated');
    }

    try {
        const parsed = JSON.parse(content);
        return {
            content: parsed.content,
            key_points: parsed.key_points || [],
            timestamps: parsed.timestamps || [],
        };
    } catch {
        // If parsing fails, return the raw content
        return {
            content,
            key_points: [],
            timestamps: [],
        };
    }
}

export async function generatePlaylistOverview(
    summaries: string[],
    playlistTitle: string
): Promise<string> {
    const response = await createCompletion({
        model: AI_MODELS.ANALYSIS,
        messages: [
            {
                role: 'system',
                content: 'You are an expert at synthesizing information from multiple video summaries into a cohesive course overview.',
            },
            {
                role: 'user',
                content: `Create a comprehensive overview for the playlist "${playlistTitle}" based on these video summaries:\n\n${summaries.join('\n\n---\n\n')}`,
            },
        ],
        temperature: 0.5,
        max_tokens: 1024,
    });

    return response.choices[0]?.message?.content || 'Overview generation failed';
}
