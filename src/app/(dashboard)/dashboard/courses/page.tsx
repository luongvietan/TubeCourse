import { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { DashboardHeader, CourseCard } from "@/components/dashboard";
import { getCourses } from "../../actions";

export const metadata: Metadata = {
    title: "Courses - TubeCourse",
    description: "Your courses on TubeCourse",
};

export default async function CoursesPage() {
    const courses = await getCourses();

    return (
        <div>
            <DashboardHeader
                title="My Courses"
                description="Manage your YouTube playlist courses"
                showAddButton
            />

            <div className="p-6">
                {/* Filters */}
                <div className="flex items-center gap-4 mb-6">
                    <button className="tag tag-accent">All ({courses.length})</button>
                    <button className="tag tag-muted">
                        Completed ({courses.filter(c => c.status === 'completed').length})
                    </button>
                    <button className="tag tag-muted">
                        Processing ({courses.filter(c => c.status === 'processing').length})
                    </button>
                    <button className="tag tag-muted">
                        Pending ({courses.filter(c => c.status === 'pending').length})
                    </button>
                </div>

                {/* Courses Grid */}
                {courses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {courses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                ) : (
                    <div className="card p-12 text-center">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                            <BookOpen className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="font-semibold mb-2">No courses yet</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                            Add a YouTube playlist URL to create your first course
                        </p>
                        <a
                            href="/dashboard"
                            className="btn-primary inline-flex"
                        >
                            Go to Dashboard
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
