import { notFound } from "next/navigation";
import { getCourse, getVideos } from "../../../actions";
import CourseDetailClient from "./course-detail-client";

interface CourseDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
    const { id } = await params;

    // Fetch real data from Supabase
    const course = await getCourse(id);

    if (!course) {
        notFound();
    }

    const videos = await getVideos(id);

    return <CourseDetailClient course={course} videos={videos} />;
}
