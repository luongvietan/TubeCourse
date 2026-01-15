"use client";

export function Features() {
    return (
        <section id="features" className="section-padding bg-surface">
            <div className="container-custom">
                {/* Section Header - Left aligned */}
                <div className="max-w-xl mb-12">
                    <span className="tag tag-accent mb-4">
                        Features
                    </span>
                    <h2 className="text-headline mb-4">
                        Everything you need to learn faster
                    </h2>
                    <p className="text-body">
                        We analyze entire playlists to create comprehensive learning materials.
                    </p>
                </div>

                {/* Bento Grid - Asymmetric */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Feature 1 - Hero sized */}
                    <div className="lg:col-span-2 card p-8 flex flex-col justify-between min-h-[280px]">
                        <div>
                            <div className="inline-flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <span className="text-caption font-medium">AI-Powered</span>
                            </div>
                            <h3 className="text-title mb-2">Intelligent Summaries</h3>
                            <p className="text-body max-w-md">
                                Our AI extracts key concepts, creates chapter breakdowns with timestamps,
                                and identifies the most important takeaways from each video.
                            </p>
                        </div>
                        {/* Visual indicator */}
                        <div className="flex items-end gap-2 mt-6">
                            <div className="w-12 h-8 bg-muted rounded" />
                            <div className="w-12 h-12 bg-muted rounded" />
                            <div className="w-12 h-16 bg-muted rounded" />
                            <div className="w-12 h-24 bg-accent/20 rounded" />
                            <div className="w-12 h-32 bg-accent rounded" />
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="card p-6 min-h-[280px] flex flex-col">
                        <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center mb-4">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <h3 className="text-title mb-2">Auto Quizzes</h3>
                        <p className="text-body text-sm flex-1">
                            Generate flashcards and quizzes automatically from video content to test understanding.
                        </p>
                        {/* Visual */}
                        <div className="mt-4 space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full border-2 border-secondary flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                </div>
                                <div className="h-2 flex-1 bg-muted rounded-full" />
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full border-2 border-border" />
                                <div className="h-2 w-3/4 bg-muted rounded-full" />
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full border-2 border-border" />
                                <div className="h-2 w-5/6 bg-muted rounded-full" />
                            </div>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="card p-6 min-h-[200px]">
                        <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center mb-4">
                            <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </div>
                        <h3 className="text-title mb-2">Regenerate Anytime</h3>
                        <p className="text-body text-sm">
                            Need a different focus? Regenerate with technical depth, beginner-friendly, or exam prep mode.
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div className="card p-6 min-h-[200px]">
                        <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center mb-4">
                            <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-title mb-2">Progress Tracking</h3>
                        <p className="text-body text-sm">
                            Track your learning journey with progress indicators and completion stats.
                        </p>
                    </div>

                    {/* Feature 5 */}
                    <div className="card p-6 min-h-[200px]">
                        <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center mb-4">
                            <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </div>
                        <h3 className="text-title mb-2">Export Notes</h3>
                        <p className="text-body text-sm">
                            Download your course materials as PDF, Markdown, or sync with Notion.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
