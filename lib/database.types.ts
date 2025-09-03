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
      class_contents: {
        Row: {
          id: string;
          slides_link: string | null;
          slides_id: string | null;
          title: string;
          description: string | null;
          category: string | null;
          difficulty: string | null;
          slide_details: { title: string; slides: Object[] } | null;
          updated_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          slides_link?: string | null;
          slides_id?: string | null;
          title: string;
          description?: string | null;
          category?: string | null;
          difficulty?: string | null;
          slide_details?: Json | null;
          updated_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          slides_link?: string | null;
          slides_id?: string | null;
          title?: string;
          description?: string | null;
          category?: string | null;
          difficulty?: string | null;
          slide_details?: Json | null;
          updated_at?: string;
          created_at?: string;
        };
      };
      conversations: {
        Row: {
          id: string;
          clerk_user_id: string;
          conversation_data: Json;
          updated_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          clerk_user_id: string;
          conversation_data?: Json;
          updated_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          clerk_user_id?: string;
          conversation_data?: Json;
          updated_at?: string;
          created_at?: string;
        };
      };
      reports: {
        Row: {
          id: string;
          clerk_user_id: string;
          report: string;
          class_history_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          clerk_user_id: string;
          report: string;
          class_history_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          clerk_user_id?: string;
          report?: string;
          class_history_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      class_history: {
        Row: {
          id: string;
          clerk_user_id: string;
          conversation_id: string | null;
          class_content_id: string | null;
          updated_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          clerk_user_id: string;
          conversation_id?: string | null;
          class_content_id?: string | null;
          updated_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          clerk_user_id?: string;
          conversation_id?: string | null;
          class_content_id?: string | null;
          updated_at?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      user_class_history_detail: {
        Row: {
          id: string;
          clerk_user_id: string;
          completed_at: string;
          class_title: string;
          category: string;
          difficulty: string;
          class_description: string;
          conversation_data: Json | null;
          updated_at: string;
          created_at: string;
        };
      };
      user_reports_detail: {
        Row: {
          id: string;
          clerk_user_id: string;
          report: string;
          class_history_id: string | null;
          created_at: string;
          updated_at: string;
          history_id: string | null;
          conversation_id: string | null;
          class_content_id: string | null;
          class_completed_at: string | null;
          class_title: string | null;
          class_category: string | null;
          class_difficulty: string | null;
          class_description: string | null;
        };
      };
    };
    Functions: {
      set_current_user_id: {
        Args: {
          user_id: string;
        };
        Returns: undefined;
      };
      get_current_user_id: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      get_user_class_count: {
        Args: {
          user_id: string;
        };
        Returns: number;
      };
      get_class_popularity: {
        Args: {
          content_id: string;
        };
        Returns: number;
      };
      get_user_category_stats: {
        Args: {
          user_id: string;
        };
        Returns: {
          category: string;
          count: number;
        }[];
      };
      add_message_to_conversation: {
        Args: {
          conversation_id: string;
          message_data: Json;
        };
        Returns: undefined;
      };
      has_report_for_class_history: {
        Args: {
          user_id: string;
          history_id: string;
        };
        Returns: boolean;
      };
      get_user_report_stats: {
        Args: {
          user_id: string;
        };
        Returns: {
          class_title: string;
          class_category: string;
          report_count: number;
          latest_report_date: string;
        }[];
      };
      find_classes_by_tag: {
        Args: {
          tag_name: string;
        };
        Returns: {
          title: string;
          category: string;
          description: string;
          slides_link: string;
        }[];
      };
      find_classes_by_duration: {
        Args: {
          min_duration: number;
          max_duration: number;
        };
        Returns: {
          title: string;
          category: string;
          duration_minutes: number;
          slides_count: number;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// ========================================
// 추가 타입 정의 (더 구체적인 타입 안전성을 위해)
// ========================================

// 슬라이드 세부 정보 타입
export interface SlideDetails {
  slides_count?: number;
  duration_minutes?: number;
  key_concepts?: string[];
  learning_objectives?: string[];
  activities?: Array<{
    type: string;
    title: string;
    duration: number;
  }>;
  materials?: string[];
  age_group?: string;
  prerequisite?: string;
  tags?: string[];
  follow_up?: string[];
  assessment?: {
    type: string;
    criteria: string[];
  };
}

// 대화 데이터 타입
export interface ConversationMessage {
  id?: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  metadata?: Json;
}

export type ConversationData = ConversationMessage[];

// 카테고리 타입
export type ClassCategory =
  | "Knowledge & Discovery"
  | "Expression & Imagination"
  | "Culture & Society";

// 난이도 타입
export type ClassDifficulty =
  | "초급"
  | "중급"
  | "고급"
  | "beginner"
  | "intermediate"
  | "advanced";

// 활동 타입
export type ActivityType =
  | "discussion"
  | "experiment"
  | "reflection"
  | "presentation"
  | "research"
  | "creative"
  | "analysis"
  | "observation"
  | "brainstorm"
  | "sharing"
  | "learning";

// ========================================
// 유틸리티 타입들
// ========================================

// 테이블별 Row 타입 추출
export type UserOnboarding =
  Database["public"]["Tables"]["user_onboarding"]["Row"];
export type ClassContent =
  Database["public"]["Tables"]["class_contents"]["Row"];
export type Conversation = Database["public"]["Tables"]["conversations"]["Row"];
export type Report = Database["public"]["Tables"]["reports"]["Row"];
export type ClassHistory = Database["public"]["Tables"]["class_history"]["Row"];

// 테이블별 Insert 타입 추출
export type UserOnboardingInsert =
  Database["public"]["Tables"]["user_onboarding"]["Insert"];
export type ClassContentInsert =
  Database["public"]["Tables"]["class_contents"]["Insert"];
export type ConversationInsert =
  Database["public"]["Tables"]["conversations"]["Insert"];
export type ReportInsert = Database["public"]["Tables"]["reports"]["Insert"];
export type ClassHistoryInsert =
  Database["public"]["Tables"]["class_history"]["Insert"];

// 테이블별 Update 타입 추출
export type UserOnboardingUpdate =
  Database["public"]["Tables"]["user_onboarding"]["Update"];
export type ClassContentUpdate =
  Database["public"]["Tables"]["class_contents"]["Update"];
export type ConversationUpdate =
  Database["public"]["Tables"]["conversations"]["Update"];
export type ReportUpdate = Database["public"]["Tables"]["reports"]["Update"];
export type ClassHistoryUpdate =
  Database["public"]["Tables"]["class_history"]["Update"];

// 뷰 타입 추출
export type UserClassHistoryDetail =
  Database["public"]["Views"]["user_class_history_detail"]["Row"];
export type UserReportsDetail =
  Database["public"]["Views"]["user_reports_detail"]["Row"];

// 함수 반환 타입 추출
export type UserCategoryStats =
  Database["public"]["Functions"]["get_user_category_stats"]["Returns"][0];
export type UserReportStats =
  Database["public"]["Functions"]["get_user_report_stats"]["Returns"][0];
export type ClassesByTag =
  Database["public"]["Functions"]["find_classes_by_tag"]["Returns"][0];
export type ClassesByDuration =
  Database["public"]["Functions"]["find_classes_by_duration"]["Returns"][0];

// ========================================
// 확장된 타입 정의 (실제 사용 시 더 편리하게)
// ========================================

// 슬라이드 세부 정보가 포함된 클래스 컨텐츠
export interface ClassContentWithDetails
  extends Omit<ClassContent, "slide_details"> {
  slide_details: SlideDetails | null;
}

// 대화 데이터가 포함된 컨버세이션
export interface ConversationWithMessages
  extends Omit<Conversation, "conversation_data"> {
  conversation_data: ConversationData;
}

// 관련 정보가 포함된 클래스 히스토리
export interface ClassHistoryWithDetails extends ClassHistory {
  class_content?: ClassContent;
  conversation?: Conversation;
  reports?: Report[];
}

// 통계 정보가 포함된 사용자 데이터
export interface UserStats {
  total_classes: number;
  category_breakdown: UserCategoryStats[];
  recent_reports: UserReportStats[];
  favorite_categories: string[];
  average_completion_time?: number;
}

// API 응답 타입들
export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
}

// ========================================
// 검색 및 필터 타입들
// ========================================

export interface ClassSearchFilters {
  category?: ClassCategory[];
  difficulty?: ClassDifficulty[];
  tags?: string[];
  duration_min?: number;
  duration_max?: number;
  search_query?: string;
}

export interface ConversationFilters {
  date_from?: string;
  date_to?: string;
  has_class_history?: boolean;
  message_count_min?: number;
}

export interface ReportFilters {
  class_category?: ClassCategory[];
  date_from?: string;
  date_to?: string;
  has_class_history?: boolean;
}
