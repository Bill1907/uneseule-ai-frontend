-- user_onboarding 테이블에 대한 RLS 정책 설정

-- 1. RLS 활성화 (이미 활성화되어 있을 수 있음)
ALTER TABLE user_onboarding ENABLE ROW LEVEL SECURITY;

-- 2. 기존 정책 삭제 (있다면)
DROP POLICY IF EXISTS "Users can insert their own onboarding data" ON user_onboarding;
DROP POLICY IF EXISTS "Users can view their own onboarding data" ON user_onboarding;
DROP POLICY IF EXISTS "Users can update their own onboarding data" ON user_onboarding;

-- 3. 새로운 정책 생성

-- INSERT 정책: 사용자가 자신의 온보딩 데이터를 삽입할 수 있음
CREATE POLICY "Users can insert their own onboarding data"
ON user_onboarding
FOR INSERT
WITH CHECK (
  auth.jwt() ->> 'sub' = clerk_user_id
);

-- SELECT 정책: 사용자가 자신의 온보딩 데이터를 조회할 수 있음  
CREATE POLICY "Users can view their own onboarding data"
ON user_onboarding
FOR SELECT
USING (
  auth.jwt() ->> 'sub' = clerk_user_id
);

-- UPDATE 정책: 사용자가 자신의 온보딩 데이터를 수정할 수 있음
CREATE POLICY "Users can update their own onboarding data"
ON user_onboarding
FOR UPDATE
USING (
  auth.jwt() ->> 'sub' = clerk_user_id
)
WITH CHECK (
  auth.jwt() ->> 'sub' = clerk_user_id
);

-- DELETE 정책: 사용자가 자신의 온보딩 데이터를 삭제할 수 있음
CREATE POLICY "Users can delete their own onboarding data"
ON user_onboarding
FOR DELETE
USING (
  auth.jwt() ->> 'sub' = clerk_user_id
); 