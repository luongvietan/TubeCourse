import { z } from 'zod';

export const createCourseSchema = z.object({
    playlist_url: z
        .string()
        .url('Please enter a valid URL')
        .refine(
            (url) => url.includes('youtube.com') || url.includes('youtu.be'),
            'Please enter a valid YouTube URL'
        )
        .refine(
            (url) => url.includes('list='),
            'Please enter a YouTube playlist URL (must contain a playlist ID)'
        ),
    language: z.string(),
});

export const updateCourseSchema = z.object({
    title: z.string().min(1).max(255).optional(),
    description: z.string().max(5000).optional(),
});

export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;
