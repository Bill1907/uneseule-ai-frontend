import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { userId } = await auth();

  if (userId) {
    // 인증된 사용자는 앱으로 리디렉션
    redirect(`/${locale}/service/app`);
  } else {
    // 미인증 사용자는 로그인 페이지로 리디렉션
    redirect(`/${locale}/service/auth`);
  }
}
