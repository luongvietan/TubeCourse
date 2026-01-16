"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Sparkles, Link as LinkIcon, CheckCircle, AlertCircle } from "lucide-react";
import { createCourseSchema, type CreateCourseInput } from "@/schemas/course";
import { createCourse } from "@/app/(dashboard)/actions";

export function PlaylistInput() {
    const LANGUAGES = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' },
        { code: 'it', name: 'Italian' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'vi', name: 'Vietnamese' },
        { code: 'ja', name: 'Japanese' },
        { code: 'ko', name: 'Korean' },
        { code: 'zh', name: 'Chinese' },
    ];

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreateCourseInput>({
        resolver: zodResolver(createCourseSchema),
        defaultValues: {
            playlist_url: '',
            language: 'en'
        }
    });

    const onSubmit = async (data: CreateCourseInput) => {
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const result = await createCourse(data.playlist_url, data.language);

            if (result.error) {
                setError(result.error);
                return;
            }

            setSuccess("Course created! Processing playlist...");
            reset();
            router.refresh();

            setTimeout(() => {
                setSuccess(null);
            }, 3000);
        } catch (err) {
            console.error("Create course error:", err);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white border border-text-main/5 rounded-[3rem] p-12 md:p-16 shadow-sm overflow-hidden relative group hover:border-text-main/10 transition-all duration-700">
            <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-16">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-full bg-text-main flex items-center justify-center shadow-lg">
                                <Sparkles className="w-5 h-5 text-bg-main" />
                            </div>
                            <span className="text-[0.65rem] font-bold uppercase tracking-[0.5em] text-text-sub/40">AI ENGINE V1</span>
                        </div>
                        <h3 className="font-jp font-medium text-4xl md:text-5xl text-text-main mb-6 italic leading-tight">
                            Expand the <br />Knowledge Base
                        </h3>
                        <p className="text-[0.95rem] text-text-sub/60 font-jp leading-relaxed max-w-lg">
                            Insert a YouTube playlist URL. Our neural engine will distill the source content into structured, high-signal intelligence.
                        </p>
                    </div>
                </div>

                {/* Messages */}
                {success && (
                    <div className="mb-10 p-5 rounded-2xl bg-text-main text-bg-main text-[0.65rem] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-700">
                        <CheckCircle size={16} />
                        {success}
                    </div>
                )}

                {error && (
                    <div className="mb-10 p-5 rounded-2xl bg-destructive/5 border border-destructive/10 text-destructive text-[0.65rem] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-4 shadow-sm animate-in fade-in slide-in-from-top-4 duration-700 italic">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="relative flex-1 group/input">
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-text-sub/30 group-focus-within/input:text-text-main transition-colors">
                                <LinkIcon size={18} />
                            </div>
                            <input
                                type="url"
                                placeholder="PASTE SOURCE URL..."
                                className="w-full pl-16 pr-8 py-6 rounded-[1.5rem] border border-text-main/5 bg-text-main/5 text-text-main font-jp text-[0.95rem] placeholder:text-text-sub/20 focus:outline-none focus:ring-1 focus:ring-text-main/10 focus:bg-white focus:shadow-2xl transition-all duration-500"
                                {...register("playlist_url")}
                            />
                        </div>
                        <div className="w-full lg:w-[240px] relative group/select">
                            <select
                                {...register("language")}
                                className="w-full h-full px-8 py-6 rounded-[1.5rem] border border-text-main/5 bg-text-main/5 text-text-main font-jp text-[0.95rem] focus:outline-none focus:ring-1 focus:ring-text-main/10 focus:bg-white focus:shadow-2xl transition-all duration-500 appearance-none cursor-pointer pr-16"
                            >
                                {LANGUAGES.map(lang => (
                                    <option key={lang.code} value={lang.code}>{lang.name.toUpperCase()}</option>
                                ))}
                            </select>
                            <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-text-sub/30 font-bold text-[0.6rem] tracking-[0.2em] italic">
                                TARGET LANG
                            </div>
                        </div>
                    </div>

                    {errors.playlist_url && (
                        <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-destructive text-center italic">{errors.playlist_url.message}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-7 rounded-[1.5rem] bg-text-main text-bg-main text-[0.7rem] font-bold uppercase tracking-[0.4em] flex items-center justify-center gap-4 shadow-2xl hover:shadow-[0_20px_40px_rgba(34,32,29,0.3)] transform active:scale-[0.99] transition-all duration-500 disabled:opacity-50 group overflow-hidden relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        {isLoading ? (
                            <span className="flex items-center gap-4 relative z-10 italic">
                                <Loader2 className="animate-spin" size={18} />
                                Distilling Knowledge...
                            </span>
                        ) : (
                            <span className="flex items-center gap-4 relative z-10 transition-all group-hover:italic">
                                <Sparkles size={18} className="fill-bg-main" />
                                Initiate Extraction
                            </span>
                        )}
                    </button>

                    <p className="text-[0.6rem] font-bold uppercase tracking-[0.4em] text-text-sub/20 text-center italic">
                        BY PROCEEDING, YOU AGREE TO OUR NEURAL PROCESSING TERMS.
                    </p>
                </form>
            </div>

            {/* Visual Decoration */}
            <div className="story-line absolute left-6 top-16 bottom-16 w-px opacity-[0.05]" />
            <div className="story-line absolute right-6 top-16 bottom-16 w-px opacity-[0.05]" />
            <div className="scan absolute inset-0 opacity-[0.01] pointer-events-none" />

            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-text-main/5 blur-3xl rounded-full" />
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-text-main/5 blur-3xl rounded-full" />
        </div>
    );
}
