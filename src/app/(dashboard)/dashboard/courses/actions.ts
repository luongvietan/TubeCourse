"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteCourse(courseId: string) {
    const supabase = await createClient();

    try {
        // Authenticate user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return { error: "Unauthorized" };
        }

        // Delete the course
        // Note: Assuming cascade delete is set up in Supabase for related videos and summaries
        // If not, we would need to delete those first.
        const { error } = await supabase
            .from("courses")
            .delete()
            .eq("id", courseId)
            .eq("user_id", user.id); // Ensure user owns the course

        if (error) {
            console.error("Error deleting course:", error);
            return { error: "Failed to delete course" };
        }

        revalidatePath("/dashboard/courses");
        return { success: true };
    } catch (error) {
        console.error("Unexpected error deleting course:", error);
        return { error: "An unexpected error occurred" };
    }
}
