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
        <div className="bg-bg-main min-h-screen">
            <DashboardHeader
                title="My Courses"
                description="Manage your YouTube playlist courses"
                showAddButton
            />

            <div className="p-10">
                {/* Filters */}
                <div className="flex items-center gap-3 mb-12 overflow-x-auto no-scrollbar pb-2">
                    <button className="px-6 py-2 rounded-full bg-text-main text-bg-main text-[0.65rem] font-bold uppercase tracking-widest transition-all">
                        All ({courses.length})
                    </button>
                    <button className="px-6 py-2 rounded-full bg-text-main/5 text-text-sub text-[0.65rem] font-bold uppercase tracking-widest hover:bg-text-main/10 transition-all">
                        Completed ({courses.filter(c => c.status === 'completed').length})
                    </button>
                    <button className="px-6 py-2 rounded-full bg-text-main/5 text-text-sub text-[0.65rem] font-bold uppercase tracking-widest hover:bg-text-main/10 transition-all">
                        Processing ({courses.filter(c => c.status === 'processing').length})
                    </button>
                    <button className="px-6 py-2 rounded-full bg-text-main/5 text-text-sub text-[0.65rem] font-bold uppercase tracking-widest hover:bg-text-main/10 transition-all">
                        Pending ({courses.filter(c => c.status === 'pending').length})
                    </button>
                </div>

                {/* Courses Grid */}
                {courses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white border border-text-main/5 rounded-3xl p-20 text-center relative overflow-hidden group">
                        <div className="relative z-10 max-w-sm mx-auto">
                            <div className="w-16 h-16 bg-text-main/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-text-main group-hover:text-bg-main transition-all duration-700">
                                <BookOpen size={24} />
                            </div>
                            <h3 className="font-jp font-medium text-2xl text-text-main mb-4">No courses yet</h3>
                            <p className="text-text-sub text-sm font-jp leading-relaxed mb-8">
                                You haven't added any playlists yet. Start by generating your first structured course.
                            </p>
                            <a
                                href="/dashboard"
                                className="btn-primary py-4 px-10 text-[0.7rem] font-bold uppercase tracking-[0.2em]"
                            >
                                Start Learning
                            </a>
                        </div>
                        <div className="story-line h-px w-24 top-1/2 left-0 opacity-10" />
                        <div className="story-line h-px w-24 top-1/2 right-0 opacity-10" />
                    </div>
                )}
            </div>
        </div>
    );
}
