"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/schemas/auth";
import { createClient } from "@/lib/supabase/client";

export function ForgotPasswordForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<ForgotPasswordInput>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordInput) => {
        setIsLoading(true);
        setError(null);

        try {
            const supabase = createClient();
            const { error: resetError } = await supabase.auth.resetPasswordForEmail(
                data.email,
                {
                    redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
                }
            );

            if (resetError) {
                setError(resetError.message);
                return;
            }

            setIsSubmitted(true);
        } catch (err) {
            console.error("Forgot password error:", err);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="text-left space-y-10 relative">
                <div className="w-16 h-16 bg-text-main text-bg-main rounded-full flex items-center justify-center shadow-2xl">
                    <CheckCircle2 size={24} />
                </div>
                <div className="space-y-4">
                    <h3 className="font-jp font-medium text-3xl text-text-main italic">Transmission Sent.</h3>
                    <p className="text-[0.85rem] font-jp text-text-sub leading-relaxed">
                        We have dispatched a recovery link to <br />
                        <span className="text-text-main font-bold">{getValues("email")}</span>.
                    </p>
                </div>
                <div className="space-y-6 pt-10 border-t border-text-main/5">
                    <p className="text-[0.65rem] font-bold uppercase tracking-widest text-text-sub">
                        No arrival? Check the void (spam) or{" "}
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="text-text-main hover:line-through transition-all"
                        >
                            Try Again
                        </button>
                    </p>
                    <Link
                        href="/login"
                        className="btn-secondary py-4 px-8 rounded-2xl inline-flex items-center gap-4 group"
                    >
                        <ArrowLeft size={14} />
                        <span className="text-[0.65rem] font-bold uppercase tracking-widest">Return to Portal</span>
                    </Link>
                </div>

                {/* Decor */}
                <div className="story-line absolute -left-6 top-0 bottom-0 w-px opacity-10" />
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            <p className="text-[0.8rem] font-jp text-text-sub leading-relaxed opacity-60">
                Provide your registered identity. We will transmit a secure recovery link to your mailbox.
            </p>

            {/* Error Message */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-2xl bg-destructive/5 border border-destructive/10 text-destructive text-[0.7rem] font-bold uppercase tracking-widest text-center"
                >
                    {error}
                </motion.div>
            )}

            {/* Email Field */}
            <div className="space-y-3">
                <label htmlFor="email" className="text-[0.65rem] font-extrabold uppercase tracking-widest text-text-main block">
                    Identity (Email)
                </label>
                <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="NAME@DOMAIN.COM"
                    className="w-full px-6 py-4 rounded-2xl border border-text-main/5 bg-text-main/5 text-text-main font-jp text-sm focus:outline-none focus:ring-1 focus:ring-text-main/20 focus:bg-transparent transition-all placeholder:opacity-20 uppercase tracking-widest"
                    {...register("email")}
                />
                {errors.email && (
                    <p className="text-[0.6rem] font-bold text-destructive uppercase tracking-widest mt-1">{errors.email.message}</p>
                )}
            </div>

            {/* Submit Button */}
            <div className="space-y-8">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-primary py-5 rounded-2xl flex items-center justify-center gap-4 group"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin" size={16} />
                            <span className="text-[0.75rem] font-bold uppercase tracking-[0.2em]">Transmitting...</span>
                        </>
                    ) : (
                        <span className="text-[0.75rem] font-bold uppercase tracking-[0.2em]">Request Recovery</span>
                    )}
                </button>

                {/* Back to Login Link */}
                <div className="flex justify-center border-t border-text-main/5 pt-8">
                    <Link
                        href="/login"
                        className="flex items-center gap-3 text-[0.65rem] font-bold uppercase tracking-widest text-text-sub hover:text-text-main transition-all group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Return to Sign In</span>
                    </Link>
                </div>
            </div>
        </form>
    );
}
