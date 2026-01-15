import { YoutubeTranscript } from 'youtube-transcript';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeVideo {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    publishedAt: string;
    position: number;
    channelId: string;
    channelTitle: string;
}

export interface PlaylistMetadata {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    channelId: string;
    channelTitle: string;
    totalVideos: number;
}

export async function fetchPlaylistMetadata(playlistId: string): Promise<PlaylistMetadata> {
    if (!YOUTUBE_API_KEY) {
        throw new Error('YOUTUBE_API_KEY is not defined');
    }

    const response = await fetch(
        `${YOUTUBE_API_BASE}/playlists?part=snippet,contentDetails&id=${playlistId}&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
        throw new Error(`YouTube API Error: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
        throw new Error('Playlist not found');
    }

    const item = data.items[0];
    const snippet = item.snippet;

    return {
        id: item.id,
        title: snippet.title,
        description: snippet.description,
        thumbnailUrl: snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || '',
        channelId: snippet.channelId,
        channelTitle: snippet.channelTitle,
        totalVideos: item.contentDetails.itemCount,
    };
}

export async function fetchPlaylistVideos(playlistId: string, maxResults = 50): Promise<YouTubeVideo[]> {
    if (!YOUTUBE_API_KEY) {
        throw new Error('YOUTUBE_API_KEY is not defined');
    }

    const videos: YouTubeVideo[] = [];
    let nextPageToken = '';

    // Fetch up to maxResults videos
    // Note: This simplistic Loop fetches everything, might need pagination control for huge playlists
    do {
        const response = await fetch(
            `${YOUTUBE_API_BASE}/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}&pageToken=${nextPageToken}`
        );

        if (!response.ok) {
            throw new Error(`YouTube API Error: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.items) break;

        for (const item of data.items) {
            const snippet = item.snippet;
            // Skip private videos or deleted videos
            if (snippet.title === 'Private video' || snippet.title === 'Deleted video') continue;

            videos.push({
                id: snippet.resourceId.videoId,
                title: snippet.title,
                description: snippet.description,
                thumbnailUrl: snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || '',
                publishedAt: snippet.publishedAt,
                position: snippet.position,
                channelId: snippet.channelId,
                channelTitle: snippet.channelTitle,
            });
        }

        nextPageToken = data.nextPageToken;

    } while (nextPageToken && videos.length < maxResults);

    return videos.slice(0, maxResults);
}

export async function fetchVideoTranscript(videoId: string): Promise<string | null> {
    try {
        const transcriptItems = await YoutubeTranscript.fetchTranscript(videoId);

        if (!transcriptItems || transcriptItems.length === 0) {
            console.warn(`No transcript items found for video ${videoId}`);
            return null;
        }

        return transcriptItems.map(item => item.text).join(' ');
    } catch (error: any) {
        // Distinguish between different types of errors
        const errorMessage = error?.message?.toString() || '';

        if (errorMessage.includes('Sign in to view')) {
            console.warn(`Video ${videoId} requires sign-in (likely age-restricted)`);
            throw new Error('TRANSCRIPT_AGE_RESTRICTED');
        }

        if (errorMessage.includes('Transcript is disabled')) {
            console.warn(`Transcripts are disabled for video ${videoId}`);
            throw new Error('TRANSCRIPT_DISABLED');
        }

        console.warn(`Failed to fetch transcript for video ${videoId}:`, error);
        return null; // Return null for generic failures to allow graceful fallback
    }
}
