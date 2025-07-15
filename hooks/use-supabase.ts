"use client";

import { useSession } from "@clerk/nextjs";
import { createAuthenticatedSupabaseClient, supabase } from "@/lib/supabase";
import { useMemo } from "react";

export const useSupabaseClient = () => {
  const { session } = useSession();

  // 인증된 사용자가 있을 때는 Clerk 토큰을 사용하는 클라이언트 반환
  const authenticatedClient = useMemo(() => {
    if (session) {
      return createAuthenticatedSupabaseClient(async () => {
        return await session.getToken();
      });
    }
    return null;
  }, [session]);

  // 인증된 클라이언트가 있으면 그것을 사용하고, 없으면 기본 클라이언트 사용
  return authenticatedClient || supabase;
};
