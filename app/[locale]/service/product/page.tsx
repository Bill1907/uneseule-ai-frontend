import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { type Locale } from "@/lib/translations";
import { getUserOnboarding } from "@/actions/onboarding";
import HomeScreen from "@/components/home-screen";

export default async function AppPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const user = await currentUser();

  if (!user) {
    redirect(`/${locale}/service/product/auth`);
  }

  const { data, error } = await getUserOnboarding(user.id);

  if (!data && !error) {
    redirect(`/${locale}/service/product/onboarding`);
  }

  const childName =
    user.firstName ||
    (locale === "ko"
      ? "작은 친구"
      : locale === "es"
        ? "pequeño amigo"
        : "little friend");
  const streakDays = 7;
  const userProgress = {
    weeklyConversations: 12,
    growthPoints: 240,
    thinkingOutput: 450,
    questionsCreated: 18,
  };

  const recentLearning = [
    {
      id: "1",
      title:
        locale === "ko"
          ? "우주는 얼마나 클까?"
          : locale === "es"
            ? "¿Qué tan grande es el universo?"
            : "How big is the universe?",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      thumbnail: "🚀",
    },
    {
      id: "2",
      title:
        locale === "ko"
          ? "공룡은 왜 사라졌을까?"
          : locale === "es"
            ? "¿Por qué desaparecieron los dinosaurios?"
            : "Why did dinosaurs disappear?",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      thumbnail: "🦕",
    },
    {
      id: "3",
      title:
        locale === "ko"
          ? "비는 어떻게 만들어질까?"
          : locale === "es"
            ? "¿Cómo se forma la lluvia?"
            : "How is rain formed?",
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
      thumbnail: "🌧️",
    },
  ];

  return (
    <HomeScreen
      locale={locale as Locale}
      childName={childName}
      streakDays={streakDays}
      userProgress={userProgress}
      recentLearning={recentLearning}
    />
  );
}
