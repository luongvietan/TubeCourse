import { Metadata } from "next";
import { RegisterForm } from "@/components/auth";

export const metadata: Metadata = {
    title: "Create Account - TubeCourse",
    description: "Create your TubeCourse account to start learning",
};

export default function RegisterPage() {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-headline">Create an account</h2>
                <p className="text-body mt-2">Start transforming playlists into courses</p>
            </div>
            <RegisterForm />
        </div>
    );
}
