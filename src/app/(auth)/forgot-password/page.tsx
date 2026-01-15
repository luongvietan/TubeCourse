import { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth";

export const metadata: Metadata = {
    title: "Forgot Password - TubeCourse",
    description: "Reset your TubeCourse password",
};

export default function ForgotPasswordPage() {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-headline">Forgot password?</h2>
                <p className="text-body mt-2">No worries, we&apos;ll help you reset it</p>
            </div>
            <ForgotPasswordForm />
        </div>
    );
}
