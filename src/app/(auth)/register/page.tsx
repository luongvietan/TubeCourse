import { Metadata } from "next";
import { RegisterForm } from "@/components/auth";

export const metadata: Metadata = {
    title: "Create Account - TubeCourse",
    description: "Create your TubeCourse account to start learning",
};

export default function RegisterPage() {
    return (
        <div className="space-y-10">
            <div className="text-left relative">
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.4em] text-text-sub mb-4 block">PORTAL</span>
                <h2 className="font-jp font-medium text-4xl text-text-main leading-tight italic">Identify yourself</h2>
                <p className="text-[0.8rem] font-jp text-text-sub mt-4 tracking-wide">Begin your transformation.</p>

                {/* Visual Decor */}
                <div className="story-line absolute -left-6 top-2 bottom-2 w-px opacity-20" />
            </div>
            <RegisterForm />
        </div>
    );
}
