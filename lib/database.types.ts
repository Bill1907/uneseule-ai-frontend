export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      user_onboarding: {
        Row: {
          id: string;
          clerk_user_id: string;
          age: number;
          learning_language: string;
          sex: string;
          learning_goals: string;
          language_level: string;
          interests: string[];
          tutor_style: string;
          feedback_style: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          clerk_user_id: string;
          age: number;
          learning_language: string;
          sex: string;
          learning_goals: string;
          language_level: string;
          interests: string[];
          tutor_style: string;
          feedback_style: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          clerk_user_id?: string;
          age?: number;
          learning_language?: string;
          sex?: string;
          learning_goals?: string;
          language_level?: string;
          interests?: string[];
          tutor_style?: string;
          feedback_style?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
