import { notFound } from "next/navigation";
import { getCourse, getVideos } from "../../../../actions";
import ZenModeClient from "./zen-mode-client";

interface ZenModePageProps {
    params: Promise<{ id: string }>;
}

export default async function ZenModePage({ params }: ZenModePageProps) {
    const { id } = await params;

    const course = await getCourse(id);
    if (!course) {
        notFound();
    }

    const videos = await getVideos(id);

    return <ZenModeClient course={course} videos={videos} />;
}
