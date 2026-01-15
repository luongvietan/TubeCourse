
import { Innertube, UniversalCache } from 'youtubei.js';

async function test() {
    console.log("Initializing Innertube...");
    const yt = await Innertube.create({
        cache: new UniversalCache(false),
        generate_session_locally: true
    });

    const videoId = "Cqbleas1mmo";

    try {
        const info = await yt.getInfo(videoId);

        if (info.captions && info.captions.caption_tracks && info.captions.caption_tracks.length > 0) {
            const track = info.captions.caption_tracks[0];
            const baseUrl = track.base_url;
            console.log("Fetching transcript from:", baseUrl);

            // Try fetching JSON
            const jsonUrl = baseUrl + '&fmt=json3';
            const response = await fetch(jsonUrl);
            if (!response.ok) {
                console.error("Failed to fetch JSON transcript:", response.status);
                return;
            }

            const json = await response.json();
            console.log("JSON fetched successfully.");

            // Allow inspection of JSON structure
            // usually json.events
            if (json.events) {
                console.log("Found events:", json.events.length);
                const text = json.events
                    .map((e: any) => e.segs ? e.segs.map((s: any) => s.utf8).join('') : '')
                    .join(' ')
                    .replace(/\s+/g, ' ')
                    .trim();
                console.log("Transcript preview:", text.substring(0, 100));
            } else {
                console.log("Unknown JSON structure:", Object.keys(json));
            }

        } else {
            console.log("No caption tracks found.");
        }

    } catch (error: any) {
        console.error("Error:", error.message);
    }
}

test();
