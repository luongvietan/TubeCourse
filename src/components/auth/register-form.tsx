"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { registerSchema, type RegisterInput } from "@/schemas/auth";
import { createClient } from "@/lib/supabase/client";

export function RegisterForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterInput) => {
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const supabase = createClient();
            const { error: authError } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        full_name: data.full_name || undefined,
                    },
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (authError) {
                setError(authError.message);
                return;
            }

            setSuccess("Check your email to confirm your account!");
        } catch (err) {
            console.error("Register error:", err);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
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

            {/* Success Message */}
            {success && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-2xl bg-text-main text-bg-main text-[0.7rem] font-bold uppercase tracking-widest text-center flex items-center justify-center gap-3 shadow-2xl"
                >
                    <CheckCircle size={14} />
                    {success}
                </motion.div>
            )}

            <div className="space-y-8">
                {/* Name Field */}
                <div className="space-y-3">
                    <label htmlFor="full_name" className="text-[0.65rem] font-extrabold uppercase tracking-widest text-text-main block">
                        Designation (Full Name) <span className="opacity-40 ml-2">-- OPTIONAL</span>
                    </label>
                    <input
                        id="full_name"
                        type="text"
                        autoComplete="name"
                        placeholder="ANONYMOUS LEARNER"
                        className="w-full px-6 py-4 rounded-2xl border border-text-main/5 bg-text-main/5 text-text-main font-jp text-sm focus:outline-none focus:ring-1 focus:ring-text-main/20 focus:bg-transparent transition-all placeholder:opacity-20 uppercase tracking-widest"
                        {...register("full_name")}
                    />
                    {errors.full_name && (
                        <p className="text-[0.6rem] font-bold text-destructive uppercase tracking-widest mt-1">{errors.full_name.message}</p>
                    )}
                </div>

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

                {/* Password Field */}
                <div className="space-y-3">
                    <label htmlFor="password" className="text-[0.65rem] font-extrabold uppercase tracking-widest text-text-main block">
                        Verification (Password)
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            placeholder="••••••••"
                            className="w-full px-6 py-4 pr-16 rounded-2xl border border-text-main/5 bg-text-main/5 text-text-main font-jp text-sm focus:outline-none focus:ring-1 focus:ring-text-main/20 focus:bg-transparent transition-all placeholder:opacity-20"
                            {...register("password")}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-6 top-1/2 -translate-y-1/2 text-text-sub hover:text-text-main transition-colors"
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-[0.6rem] font-bold text-destructive uppercase tracking-widest mt-1">{errors.password.message}</p>
                    )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-3">
                    <label htmlFor="confirmPassword" className="text-[0.65rem] font-extrabold uppercase tracking-widest text-text-main block">
                        Confirm Verification
                    </label>
                    <div className="relative">
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            autoComplete="new-password"
                            placeholder="••••••••"
                            className="w-full px-6 py-4 pr-16 rounded-2xl border border-text-main/5 bg-text-main/5 text-text-main font-jp text-sm focus:outline-none focus:ring-1 focus:ring-text-main/20 focus:bg-transparent transition-all placeholder:opacity-20"
                            {...register("confirmPassword")}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-6 top-1/2 -translate-y-1/2 text-text-sub hover:text-text-main transition-colors"
                        >
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-[0.6rem] font-bold text-destructive uppercase tracking-widest mt-1">{errors.confirmPassword.message}</p>
                    )}
                </div>
            </div>

            {/* Submit Button */}
            <div className="space-y-8">
                <button
                    type="submit"
                    disabled={isLoading || !!success}
                    className="w-full btn-primary py-5 rounded-2xl flex items-center justify-center gap-4 group disabled:opacity-50"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin" size={16} />
                            <span className="text-[0.75rem] font-bold uppercase tracking-[0.2em]">Processing...</span>
                        </>
                    ) : (
                        <span className="text-[0.75rem] font-bold uppercase tracking-[0.2em]">Initiate Account</span>
                    )}
                </button>

                {/* Terms */}
                <p className="text-center text-[0.6rem] font-bold uppercase tracking-[0.2em] text-text-sub/60 px-4 leading-relaxed">
                    By initiating, you agree to our{" "}
                    <Link href="/terms" className="text-text-main hover:line-through transition-all">
                        Terms
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-text-main hover:line-through transition-all">
                        Privacy
                    </Link>
                </p>

                {/* Login Link */}
                <p className="text-center text-[0.65rem] font-bold uppercase tracking-widest text-text-sub border-t border-text-main/5 pt-8">
                    Existing user?{" "}
                    <Link
                        href="/login"
                        className="text-text-main hover:line-through transition-all underline decoration-text-main/10 underline-offset-8 decoration-2"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </form>
    );
}
