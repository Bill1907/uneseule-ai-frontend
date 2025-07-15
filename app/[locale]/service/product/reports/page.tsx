import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ReportsPage({
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
        <h1 className="text-2xl font-bold">성장 리포트</h1>
        <p className="text-muted-foreground">
          AI 학습 진행 상황과 성장 지표를 확인할 수 있습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-xl font-semibold mb-2">학습 진도</h3>
          <p className="text-muted-foreground mb-4">
            현재까지의 학습 진행 상황을 확인하세요
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-primary h-2.5 rounded-full"
              style={{ width: "70%" }}
            ></div>
          </div>
          <span className="text-sm text-muted-foreground">70% 완료</span>
        </div>

        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-xl font-semibold mb-2">성취도</h3>
          <p className="text-muted-foreground mb-4">
            학습 성과와 달성한 목표를 확인하세요
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">85점</span>
            <span className="text-sm text-green-600">+5점 향상</span>
          </div>
        </div>

        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-xl font-semibold mb-2">활동 기록</h3>
          <p className="text-muted-foreground mb-4">
            최근 활동 내역과 학습 패턴을 분석합니다
          </p>
          <div className="space-y-2">
            <div className="text-sm">오늘: 2시간 학습</div>
            <div className="text-sm">이번 주: 12시간 학습</div>
            <div className="text-sm">연속 학습: 5일</div>
          </div>
        </div>
      </div>
    </div>
  );
}
