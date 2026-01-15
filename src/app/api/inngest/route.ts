import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { processCourse, summarizeVideo } from "@/lib/inngest/functions";

// Create an API that serves zero-serverless functions
export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        processCourse,
        summarizeVideo
    ],
});
