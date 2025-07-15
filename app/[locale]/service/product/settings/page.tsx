import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { userId } = await auth();

  if (!userId) {
    redirect(`/${locale}/service/auth`);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">설정</h1>
        <p className="text-muted-foreground">
          계정 정보와 서비스 설정을 관리할 수 있습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-xl font-semibold mb-4">계정 설정</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                사용자 이름
              </label>
              <input
                type="text"
                placeholder="사용자 이름을 입력하세요"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">이메일</label>
              <input
                type="email"
                placeholder="이메일을 입력하세요"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90">
              저장하기
            </button>
          </div>
        </div>

        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-xl font-semibold mb-4">알림 설정</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">이메일 알림</span>
              <input type="checkbox" className="toggle" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">학습 리마인더</span>
              <input type="checkbox" className="toggle" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">성과 알림</span>
              <input type="checkbox" className="toggle" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-xl font-semibold mb-4">개인정보 보호</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                데이터 보관 기간
              </label>
              <select className="w-full p-2 border rounded-md">
                <option>1년</option>
                <option>2년</option>
                <option>5년</option>
                <option>영구</option>
              </select>
            </div>
            <button className="w-full bg-destructive text-destructive-foreground py-2 px-4 rounded-md hover:bg-destructive/90">
              계정 삭제
            </button>
          </div>
        </div>

        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-xl font-semibold mb-4">고급 설정</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                언어 설정
              </label>
              <select className="w-full p-2 border rounded-md">
                <option>한국어</option>
                <option>English</option>
                <option>日本語</option>
                <option>中文</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">시간대</label>
              <select className="w-full p-2 border rounded-md">
                <option>서울 (UTC+9)</option>
                <option>도쿄 (UTC+9)</option>
                <option>뉴욕 (UTC-5)</option>
                <option>런던 (UTC+0)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
