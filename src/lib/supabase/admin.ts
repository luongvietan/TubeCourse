import { createClient } from '@supabase/supabase-js';

// Accessing the database as an admin during background jobs (bypassing RLS)
// This is necessary because Inngest functions don't have a user session
export const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
);

/**
 * Increment usage stats for a user.
 * Note: This uses a read-modify-write pattern which has a small race condition risk.
 * For high-volume production, replace with a Database RPC function.
 */
export async function incrementUsage(
    userId: string,
    increments: {
        tokens_used?: number;
        videos_summarized?: number;
        playlists_processed?: number
    }
) {
    const currentMonth = new Date().toISOString().slice(0, 7) + '-01'; // YYYY-MM-01

    // 1. Get current usage or create if not exists
    const { data: current, error: fetchError } = await supabaseAdmin
        .from('usage')
        .select('*')
        .eq('user_id', userId)
        .eq('month', currentMonth)
        .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = not found
        console.error('Error fetching usage:', fetchError);
        return;
    }

    if (!current) {
        // Create new record
        const { error: insertError } = await supabaseAdmin
            .from('usage')
            .insert({
                user_id: userId,
                month: currentMonth,
                tokens_used: increments.tokens_used || 0,
                videos_summarized: increments.videos_summarized || 0,
                playlists_processed: increments.playlists_processed || 0
            });

        if (insertError) console.error('Error creating usage record:', insertError);
        return;
    }

    // 2. Update existing record
    const { error: updateError } = await supabaseAdmin
        .from('usage')
        .update({
            tokens_used: (current.tokens_used || 0) + (increments.tokens_used || 0),
            videos_summarized: (current.videos_summarized || 0) + (increments.videos_summarized || 0),
            playlists_processed: (current.playlists_processed || 0) + (increments.playlists_processed || 0),
            updated_at: new Date().toISOString()
        })
        .eq('id', current.id);

    if (updateError) console.error('Error updating usage:', updateError);
}
