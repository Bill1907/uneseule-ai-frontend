import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 기본 Supabase 클라이언트 (비인증 요청용)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Clerk 토큰을 사용하는 인증된 Supabase 클라이언트 생성 함수
export const createAuthenticatedSupabaseClient = (
  getToken: () => Promise<string | null>
) => {
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    accessToken: getToken,
    auth: {
      persistSession: false,
    },
  });
};

// 서버 사이드에서 사용할 Service Role 클라이언트 (필요시)
// 현재 사용하지 않음 - Clerk 토큰 방식을 사용하므로 Service Role Key 불필요
// export const supabaseAdmin = createClient<Database>(
//   supabaseUrl,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!,
//   {
//     auth: {
//       autoRefreshToken: false,
//       persistSession: false,
//     },
//   }
// );
