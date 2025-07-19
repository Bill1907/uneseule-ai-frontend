"use server";

import { getSupabaseServerClient } from "@/lib/supabase-server";
import { ClassContent } from "@/lib/database.types";

export async function getUserLessons(
  userId: string
): Promise<{ data: any[] | null; error: string | null }> {
  try {
    const supabase = await getSupabaseServerClient();

    // 예시: lessons 테이블이 있다면
    const { data, error } = await supabase
      .from("lessons")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching user lessons:", error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Unexpected error in getUserLessons:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function createLesson(
  userId: string,
  lessonData: {
    title: string;
    content: string;
    difficulty_level?: string;
    language?: string;
  }
): Promise<{ data: any | null; error: string | null }> {
  try {
    const supabase = await getSupabaseServerClient();

    const { data, error } = await supabase
      .from("lessons")
      .insert({
        user_id: userId,
        ...lessonData,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating lesson:", error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Unexpected error in createLesson:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateLessonProgress(
  lessonId: string,
  userId: string,
  progress: number
): Promise<{ data: any | null; error: string | null }> {
  try {
    const supabase = await getSupabaseServerClient();

    const { data, error } = await supabase
      .from("lesson_progress")
      .upsert({
        lesson_id: lessonId,
        user_id: userId,
        progress,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error updating lesson progress:", error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Unexpected error in updateLessonProgress:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getClassContents(): Promise<{
  data: ClassContent[] | null;
  error: string | null;
}> {
  try {
    const supabase = await getSupabaseServerClient();

    const { data, error } = await supabase
      .from("class_contents")
      .select("*")
      .order("category", { ascending: true })
      .order("difficulty", { ascending: true })
      .order("title", { ascending: true });

    if (error) {
      console.error("Error fetching class contents:", error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Unexpected error in getClassContents:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getClassContent(
  id: string
): Promise<{
  data: ClassContent | null;
  error: string | null;
}> {
  try {
    const supabase = await getSupabaseServerClient();

    const { data, error } = await supabase
      .from("class_contents")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching class content:", error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Unexpected error in getClassContent:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
