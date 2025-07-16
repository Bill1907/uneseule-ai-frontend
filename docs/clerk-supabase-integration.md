# Clerk ↔ Supabase 연동 사용법

## 🎯 개요

이 프로젝트에서는 Clerk의 인증 토큰을 사용하여 Supabase 데이터에 안전하게 접근할 수 있습니다.

## 📱 클라이언트 컴포넌트에서 사용

```tsx
"use client";

import { useSupabaseClient } from "@/hooks/use-supabase";

export function UserProfile() {
  const supabase = useSupabaseClient();

  const fetchUserData = async () => {
    // Clerk 토큰이 자동으로 포함되어 요청됩니다
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("user_id", "clerk_user_id");

    if (error) {
      console.error("Error:", error);
      return;
    }
  };

  return (
    <div>
      <button onClick={fetchUserData}>Load User Data</button>
    </div>
  );
}
```

## 🖥️ 서버 컴포넌트에서 사용

```tsx
import { getSupabaseServerClient } from "@/lib/supabase-server";

export default async function ServerPage() {
  const supabase = await getSupabaseServerClient();

  // Clerk 토큰이 자동으로 포함되어 요청됩니다
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div>Error loading posts</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
```

## 🔒 RLS 정책 예시

Supabase에서 다음과 같은 RLS 정책을 설정할 수 있습니다:

```sql
-- 인증된 사용자만 자신의 데이터에 접근 가능
CREATE POLICY "Users can only access their own data" ON user_profiles
  FOR ALL USING (auth.jwt() ->> 'sub' = user_id);

-- 조직 멤버만 조직 데이터에 접근 가능
CREATE POLICY "Organization members only" ON organization_data
  FOR ALL USING (
    auth.jwt() ->> 'org_id' = organization_id
  );
```

## 🚀 주요 특징

- ✅ **자동 토큰 관리**: Clerk 세션이 자동으로 Supabase 요청에 포함
- ✅ **타입 안전성**: TypeScript로 완전한 타입 지원
- ✅ **서버/클라이언트 지원**: 양쪽 모두에서 동일한 방식으로 사용
- ✅ **보안**: RLS 정책으로 데이터 접근 제어

## ⚠️ 주의사항

1. **환경변수 설정 필요**: Supabase URL과 키가 설정되어 있어야 함
2. **Clerk 설정 완료**: Supabase 연동이 Clerk에서 설정되어 있어야 함
3. **RLS 정책**: 데이터 보안을 위해 적절한 RLS 정책 설정 필요
