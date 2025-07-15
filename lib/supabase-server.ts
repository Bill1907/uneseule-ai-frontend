import { auth } from "@clerk/nextjs/server";
import { createAuthenticatedSupabaseClient, supabase } from "./supabase";

// 서버 컴포넌트에서 사용할 수 있는 인증된 Supabase 클라이언트
// 🔒 보안: Service Role Key는 절대 사용하지 않음. 오직 anon key + Clerk 토큰만 사용
export const getSupabaseServerClient = async () => {
  const { getToken } = await auth();

  // 인증된 사용자가 있을 때는 Clerk 토큰을 사용하는 클라이언트 반환
  // 안전함: anon key + accessToken(Clerk) 방식으로 Third-Party Auth 사용
  if (getToken) {
    return createAuthenticatedSupabaseClient(async () => {
      return await getToken();
    });
  }

  // 인증되지 않은 경우 기본 클라이언트 반환 (anon key만 사용)
  return supabase;
};
