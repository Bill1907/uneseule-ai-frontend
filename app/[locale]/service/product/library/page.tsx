import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function LibraryPage({
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
        <h1 className="text-2xl font-bold">학습 라이브러리</h1>
        <p className="text-muted-foreground">
          AI와 함께 학습할 수 있는 다양한 콘텐츠를 제공합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-xl font-semibold mb-2">기초 AI 학습</h3>
          <p className="text-muted-foreground mb-4">
            AI의 기본 개념과 원리를 학습해보세요
          </p>
          <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90">
            학습 시작
          </button>
        </div>

        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-xl font-semibold mb-2">고급 기법</h3>
          <p className="text-muted-foreground mb-4">
            고급 AI 기법과 실전 활용법을 배워보세요
          </p>
          <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90">
            학습 시작
          </button>
        </div>

        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-xl font-semibold mb-2">실습 프로젝트</h3>
          <p className="text-muted-foreground mb-4">
            실제 프로젝트를 통해 실력을 향상시키세요
          </p>
          <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90">
            프로젝트 시작
          </button>
        </div>
      </div>
    </div>
  );
}
