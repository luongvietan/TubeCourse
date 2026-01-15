'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type { Course, Video } from '@/types';
import { inngest } from '@/lib/inngest/client';

export async function getCourses(): Promise<Course[]> {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data: courses, error } = await supabase
        .from('courses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching courses:', error);
        return [];
    }

    return courses || [];
}

export async function getCourse(id: string): Promise<Course | null> {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: course, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

    if (error) {
        console.error('Error fetching course:', error);
        return null;
    }

    return course;
}

export async function createCourse(playlistUrl: string) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: 'Unauthorized' };
    }

    // Extract playlist ID from URL
    // Supports common formats:
    // - youtube.com/playlist?list=ID
    // - youtube.com/watch?v=ID&list=ID
    // - watch?v=ID&list=ID
    const playlistIdMatch = playlistUrl.match(/[?&]list=([^&]+)/);
    if (!playlistIdMatch) {
        return { error: 'Invalid YouTube playlist URL. Please make sure it contains a "list=" parameter.' };
    }

    const playlist_id = playlistIdMatch[1];

    // Check if course already exists
    const { data: existingCourse } = await supabase
        .from('courses')
        .select('id')
        .eq('user_id', user.id)
        .eq('playlist_id', playlist_id)
        .single();

    if (existingCourse) {
        return { error: 'This playlist has already been added' };
    }

    // Create course with pending status
    const { data: course, error } = await supabase
        .from('courses')
        .insert({
            user_id: user.id,
            playlist_id,
            playlist_url: playlistUrl,
            title: `Playlist ${playlist_id}`, // TODO: Fetch real title from YouTube API
            channel_name: 'Loading...', // Placeholder until background process finishes
            channel_id: 'unknown',
            status: 'pending',
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating course:', error);
        return { error: 'Failed to create course' };
    }

    // Trigger background processing (Fire and forget)
    // Directly use Inngest client since we are in a server action
    await inngest.send({
        name: 'course.create',
        data: {
            courseId: course.id,
        },
    });

    revalidatePath('/dashboard');
    revalidatePath('/dashboard/courses');

    return { data: course };
}

export async function deleteCourse(id: string) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: 'Unauthorized' };
    }

    const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) {
        console.error('Error deleting course:', error);
        return { error: 'Failed to delete course' };
    }

    revalidatePath('/dashboard');
    revalidatePath('/dashboard/courses');

    return { success: true };
}

export async function getDashboardStats() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return {
            totalCourses: 0,
            videosSummarized: 0,
            completedCourses: 0,
        };
    }

    // Get course count
    const { count: totalCourses } = await supabase
        .from('courses')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

    // Get completed course count
    const { count: completedCourses } = await supabase
        .from('courses')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('status', 'completed');

    // Get summarized videos count
    const { count: videosSummarized } = await supabase
        .from('videos')
        .select('*, courses!inner(*)', { count: 'exact', head: true })
        .eq('courses.user_id', user.id)
        .eq('status', 'completed');

    return {
        totalCourses: totalCourses || 0,
        videosSummarized: videosSummarized || 0,
        completedCourses: completedCourses || 0,
    };
}

export async function getVideos(courseId: string): Promise<Video[]> {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data: videos, error } = await supabase
        .from('videos')
        .select('*, courses!inner(*)')
        .eq('course_id', courseId)
        .eq('courses.user_id', user.id)
        .order('position', { ascending: true });

    if (error) {
        console.error('Error fetching videos:', error);
        return [];
    }

    return videos || [];
}

