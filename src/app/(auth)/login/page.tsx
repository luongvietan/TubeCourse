import { Metadata } from "next";
import { LoginForm } from "@/components/auth";

export const metadata: Metadata = {
    title: "Sign In - TubeCourse",
    description: "Sign in to your TubeCourse account",
};

export default function LoginPage() {
    return (
        <div className="space-y-10">
            <div className="text-left relative">
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.4em] text-text-sub mb-4 block">PORTAL</span>
                <h2 className="font-jp font-medium text-4xl text-text-main leading-tight italic">Welcome back</h2>
                <p className="text-[0.8rem] font-jp text-text-sub mt-4 tracking-wide">Sign in to resume your journey.</p>

                {/* Visual Decor */}
                <div className="story-line absolute -left-6 top-2 bottom-2 w-px opacity-20" />
            </div>
            <LoginForm />
        </div>
    );
}
