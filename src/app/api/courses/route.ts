import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET /api/courses - Fetch all courses for authenticated user
export async function GET() {
    try {
        const supabase = await createClient();

        // Check authentication
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Fetch courses for the user
        const { data: courses, error } = await supabase
            .from('courses')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching courses:', error);
            return NextResponse.json(
                { error: 'Failed to fetch courses' },
                { status: 500 }
            );
        }

        return NextResponse.json({ data: courses });
    } catch (error) {
        console.error('Courses API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST /api/courses - Create a new course from YouTube playlist URL
export async function POST(request: Request) {
    try {
        const supabase = await createClient();

        // Check authentication
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { playlist_url } = body;

        if (!playlist_url) {
            return NextResponse.json(
                { error: 'Playlist URL is required' },
                { status: 400 }
            );
        }

        // Extract playlist ID from URL
        const playlistIdMatch = playlist_url.match(/[?&]list=([^&]+)/);
        if (!playlistIdMatch) {
            return NextResponse.json(
                { error: 'Invalid YouTube playlist URL' },
                { status: 400 }
            );
        }

        const playlist_id = playlistIdMatch[1];

        // Check if course already exists for this user
        const { data: existingCourse } = await supabase
            .from('courses')
            .select('id')
            .eq('user_id', user.id)
            .eq('playlist_id', playlist_id)
            .single();

        if (existingCourse) {
            return NextResponse.json(
                { error: 'This playlist has already been added', data: existingCourse },
                { status: 409 }
            );
        }

        // Create course with pending status
        // In a real implementation, you would fetch playlist data from YouTube API
        const { data: course, error } = await supabase
            .from('courses')
            .insert({
                user_id: user.id,
                playlist_id,
                playlist_url,
                title: `Playlist ${playlist_id}`, // Placeholder - would be fetched from YouTube API
                channel_name: 'Unknown', // Placeholder
                channel_id: 'unknown', // Placeholder
                status: 'pending',
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating course:', error);
            return NextResponse.json(
                { error: 'Failed to create course' },
                { status: 500 }
            );
        }

        // TODO: Trigger background job to fetch playlist data from YouTube API
        // and process videos for summarization

        return NextResponse.json({ data: course }, { status: 201 });
    } catch (error) {
        console.error('Create course API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
