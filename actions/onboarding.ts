"use server";

import { getSupabaseServerClient } from "@/lib/supabase-server";
import { Database } from "@/lib/database.types";

type UserOnboarding = Database["public"]["Tables"]["user_onboarding"]["Row"];

export async function getUserOnboarding(
  userId: string
): Promise<{ data: UserOnboarding | null; error: string | null }> {
  try {
    const supabase = await getSupabaseServerClient();

    const { data, error } = await supabase
      .from("user_onboarding")
      .select("*")
      .eq("clerk_user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching user onboarding:", error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Unexpected error in getUserOnboarding:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function createUserOnboarding(
  userId: string,
  onboardingData: Partial<
    Omit<UserOnboarding, "id" | "clerk_user_id" | "created_at" | "updated_at">
  >
): Promise<{ data: UserOnboarding | null; error: string | null }> {
  try {
    const supabase = await getSupabaseServerClient();

    const { data, error } = await supabase
      .from("user_onboarding")
      .insert({
        clerk_user_id: userId,
        ...onboardingData,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating user onboarding:", error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Unexpected error in createUserOnboarding:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateUserOnboarding(
  userId: string,
  updates: Partial<Omit<UserOnboarding, "id" | "clerk_user_id" | "created_at">>
): Promise<{ data: UserOnboarding | null; error: string | null }> {
  try {
    const supabase = await getSupabaseServerClient();

    const { data, error } = await supabase
      .from("user_onboarding")
      .update(updates)
      .eq("clerk_user_id", userId)
      .select()
      .single();

    if (error) {
      console.error("Error updating user onboarding:", error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Unexpected error in updateUserOnboarding:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
