"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { loginSchema, type LoginInput } from "@/schemas/auth";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginInput) => {
        setIsLoading(true);
        setError(null);

        try {
            const supabase = createClient();
            const { error: authError } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            });

            if (authError) {
                setError(authError.message);
                return;
            }

            router.push("/dashboard");
            router.refresh();
        } catch (err) {
            console.error("Login error:", err);
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

            <div className="space-y-8">
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
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-[0.65rem] font-extrabold uppercase tracking-widest text-text-main">
                            Verification (Password)
                        </label>
                        <Link
                            href="/forgot-password"
                            className="text-[0.6rem] font-bold uppercase tracking-widest text-text-sub hover:text-text-main transition-colors hover:line-through"
                        >
                            Recover?
                        </Link>
                    </div>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
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
            </div>

            {/* Submit Button */}
            <div className="space-y-6">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-primary py-5 rounded-2xl flex items-center justify-center gap-4 group disabled:opacity-50"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin" size={16} />
                            <span className="text-[0.75rem] font-bold uppercase tracking-[0.2em]">Authenticating...</span>
                        </>
                    ) : (
                        <span className="text-[0.75rem] font-bold uppercase tracking-[0.2em]">Verify Identity</span>
                    )}
                </button>

                {/* Register Link */}
                <p className="text-center text-[0.65rem] font-bold uppercase tracking-widest text-text-sub">
                    No access?{" "}
                    <Link
                        href="/register"
                        className="text-text-main hover:line-through transition-all underline decoration-text-main/10 underline-offset-8 decoration-2"
                    >
                        Register Now
                    </Link>
                </p>
            </div>
        </form>
    );
}
