import { Metadata } from "next";
import { LoginForm } from "@/components/auth";

export const metadata: Metadata = {
    title: "Sign In - TubeCourse",
    description: "Sign in to your TubeCourse account",
};

export default function LoginPage() {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-headline">Welcome back</h2>
                <p className="text-body mt-2">Sign in to continue learning</p>
            </div>
            <LoginForm />
        </div>
    );
}
