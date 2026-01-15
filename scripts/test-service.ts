
import { fetchVideoTranscript } from '../src/services/youtube/index';

async function test() {
    console.log("Testing fetchVideoTranscript...");

    // Video with known captions: Me at the zoo
    // const videoId = "jNQXAC9IVRw"; 
    // Generic tech video
    const videoId = "Cqbleas1mmo";

    console.log(`Fetching transcript for ${videoId}...`);
    try {
        const transcript = await fetchVideoTranscript(videoId);
        if (transcript) {
            console.log("SUCCESS! Transcript length:", transcript.length);
            console.log("Preview:", transcript.substring(0, 100));
        } else {
            console.log("Returned null (no transcript found).");
        }
    } catch (e: any) {
        console.error("FAILED:", e.message);
        console.error(e);
    }
}

test();
