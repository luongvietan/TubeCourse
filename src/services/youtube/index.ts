import { Innertube, UniversalCache } from 'youtubei.js';

// Singleton instance to reuse
let youtube: Innertube | null = null;

async function getYoutubeClient() {
    if (youtube) return youtube;
    youtube = await Innertube.create({
        cache: new UniversalCache(false),
        generate_session_locally: true
    });
    return youtube;
}

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
    const yt = await getYoutubeClient();

    try {
        const playlist = await yt.getPlaylist(playlistId);

        // Helper to get best thumbnail
        const getBestThumbnail = (thumbnails: any[]) => {
            if (!thumbnails || thumbnails.length === 0) return '';
            return thumbnails[thumbnails.length - 1].url; // usually sorted by size
        };

        // Extract basic info safely
        const info = playlist.info;

        return {
            id: playlistId,
            title: info.title || '',
            description: info.description || '',
            thumbnailUrl: getBestThumbnail(info.thumbnails),
            channelId: info.author?.id || '',
            channelTitle: info.author?.name || '',
            totalVideos: info.total_items ? parseInt(info.total_items.replace(/[^0-9]/g, '')) : 0,
        };
    } catch (error: any) {
        console.error('Error fetching playlist metadata:', error);
        throw new Error(`Failed to fetch playlist: ${error.message}`);
    }
}

export async function fetchPlaylistVideos(playlistId: string, maxResults = 50): Promise<YouTubeVideo[]> {
    const yt = await getYoutubeClient();

    try {
        const playlist = await yt.getPlaylist(playlistId);

        const videos: YouTubeVideo[] = [];

        // Helper to process items
        const processItems = (items: any[]) => {
            items.forEach((video: any) => {
                // We only want videos. Innertube might return various item types.
                // Video, CompactVideo, PlaylistVideo are common.
                if (video.type !== 'Video' && video.type !== 'CompactVideo' && video.type !== 'PlaylistVideo') return;

                const getBestThumbnail = (thumbnails: any[]) => {
                    if (!thumbnails || thumbnails.length === 0) return '';
                    return thumbnails[thumbnails.length - 1].url;
                };

                // Safely extract text properties which might be objects or strings
                const title = video.title?.toString() || video.title?.text || '';
                const description = video.description?.toString() || ''; // Descriptions might be missing in playlist view
                const author = video.author?.name || video.author?.toString() || '';
                const authorId = video.author?.id || '';

                videos.push({
                    id: video.id,
                    title: title,
                    description: description,
                    thumbnailUrl: getBestThumbnail(video.thumbnails),
                    publishedAt: new Date().toISOString(), // Playlist items often don't have exact published date easily accessible
                    position: videos.length,
                    channelId: authorId,
                    channelTitle: author,
                });
            });
        };

        if (playlist.videos) {
            processItems(playlist.videos);
        }

        // Handle continuation for pagination if needed
        let currentPlaylist = playlist;
        while (videos.length < maxResults && currentPlaylist.has_continuation) {
            currentPlaylist = await currentPlaylist.getContinuation();
            if (currentPlaylist.videos) {
                processItems(currentPlaylist.videos);
            }
        }

        return videos.slice(0, maxResults);

    } catch (error: any) {
        console.error('Error fetching playlist videos:', error);
        throw new Error(`Failed to fetch playlist videos: ${error.message}`);
    }
}

export async function fetchVideoTranscript(videoId: string): Promise<string | null> {
    const yt = await getYoutubeClient();

    try {
        const info = await yt.getInfo(videoId);

        // Attempt to find caption tracks
        const captionTracks = info.captions?.caption_tracks;

        if (!captionTracks || captionTracks.length === 0) {
            console.warn(`No caption tracks found for video ${videoId}`);
            // Check if it's age restricted or disabled in a way that Innertube caught
            return null;
        }

        // Strategy: Prefer English, otherwise take the first one
        // Sort/Find logic
        let selectedTrack = captionTracks.find((track: any) => track.language_code?.startsWith('en'));

        if (!selectedTrack) {
            // Fallback to the first available track
            selectedTrack = captionTracks[0];
        }

        if (!selectedTrack || !selectedTrack.base_url) {
            console.warn(`Selected track has no base_url for video ${videoId}`);
            return null;
        }

        const baseUrl = selectedTrack.base_url;
        // Append &fmt=json3 to get JSON format (easier to parse than XML)
        const transcriptUrl = `${baseUrl}&fmt=json3`;

        const response = await fetch(transcriptUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch transcript from URL: ${response.statusText}`);
        }

        const json = await response.json();

        // Parse JSON3 format
        // Structure: { events: [ { segs: [ { utf8: "text" } ], ... } ] }
        if (json.events) {
            const text = json.events
                .map((event: any) => {
                    if (event.segs) {
                        return event.segs.map((seg: any) => seg.utf8).join('');
                    }
                    return '';
                })
                .join(' ')
                .replace(/\s+/g, ' ')
                .trim();

            return text;
        }

        return null;

    } catch (error: any) {
        // Distinguish errors
        const errorMessage = error?.message?.toString() || '';

        if (errorMessage.includes('Sign in to view')) {
            console.warn(`Video ${videoId} requires sign-in`);
            throw new Error('TRANSCRIPT_AGE_RESTRICTED');
        }

        console.warn(`Failed to fetch transcript for video ${videoId}:`, error);
        return null;
    }
}
