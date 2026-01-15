"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Sparkles, Link as LinkIcon } from "lucide-react";
import { createCourseSchema, type CreateCourseInput } from "@/schemas/course";

export function PlaylistInput() {
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreateCourseInput>({
        resolver: zodResolver(createCourseSchema),
    });

    const onSubmit = async (data: CreateCourseInput) => {
        setIsLoading(true);
        try {
            // TODO: Implement actual course creation with API
            console.log("Create course:", data);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            reset();
        } catch (error) {
            console.error("Create course error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-accent" />
                </div>
                <div>
                    <h3 className="font-semibold">Add New Playlist</h3>
                    <p className="text-sm text-muted-foreground">
                        Paste a YouTube playlist URL to create a course
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="relative">
                    <LinkIcon
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <input
                        type="url"
                        placeholder="https://www.youtube.com/playlist?list=..."
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
                        {...register("playlist_url")}
                    />
                </div>
                {errors.playlist_url && (
                    <p className="text-sm text-red-500">{errors.playlist_url.message}</p>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin" size={18} />
                            Processing playlist...
                        </>
                    ) : (
                        <>
                            <Sparkles size={18} />
                            Generate Course
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
