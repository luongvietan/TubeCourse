'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Course } from '@/types';

export function useCourses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const supabase = createClient();

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('courses')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setCourses(data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch courses');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const createCourse = async (playlistUrl: string) => {
        try {
            const response = await fetch('/api/courses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ playlist_url: playlistUrl }),
            });

            if (!response.ok) throw new Error('Failed to create course');

            const { data } = await response.json();
            setCourses(prev => [data, ...prev]);
            return data;
        } catch (err) {
            throw err instanceof Error ? err : new Error('Failed to create course');
        }
    };

    const deleteCourse = async (courseId: string) => {
        try {
            const { error } = await supabase
                .from('courses')
                .delete()
                .eq('id', courseId);

            if (error) throw error;
            setCourses(prev => prev.filter(c => c.id !== courseId));
        } catch (err) {
            throw err instanceof Error ? err : new Error('Failed to delete course');
        }
    };

    return {
        courses,
        loading,
        error,
        fetchCourses,
        createCourse,
        deleteCourse,
    };
}
