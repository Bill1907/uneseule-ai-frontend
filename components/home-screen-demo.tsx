import HomeScreen from "@/components/home-screen";
import { type Locale } from "@/lib/translations";

interface HomeScreenDemoProps {
  params: Promise<{ locale: string }>;
}

export default async function HomeScreenDemo({ params }: HomeScreenDemoProps) {
  const { locale } = await params;

  // Mock data for demonstration
  const mockData = {
    childName: locale === "ko" ? "민서" : locale === "es" ? "Sofia" : "Emma",
    streakDays: 12,
    userProgress: {
      weeklyConversations: 18,
      growthPoints: 340,
      thinkingOutput: 520,
      questionsCreated: 25,
    },
    recentLearning: [
      {
        id: "1",
        title: locale === "ko" ? "우주는 얼마나 클까?" : locale === "es" ? "¿Qué tan grande es el universo?" : "How big is the universe?",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        thumbnail: "🚀",
      },
      {
        id: "2", 
        title: locale === "ko" ? "공룡은 왜 사라졌을까?" : locale === "es" ? "¿Por qué desaparecieron los dinosaurios?" : "Why did dinosaurs disappear?",
        timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000), // 26 hours ago
        thumbnail: "🦕",
      },
      {
        id: "3",
        title: locale === "ko" ? "비는 어떻게 만들어질까?" : locale === "es" ? "¿Cómo se forma la lluvia?" : "How is rain formed?",
        timestamp: new Date(Date.now() - 50 * 60 * 60 * 1000), // 50 hours ago  
        thumbnail: "🌧️",
      },
      {
        id: "4",
        title: locale === "ko" ? "바다는 왜 짠 맛일까?" : locale === "es" ? "¿Por qué el mar es salado?" : "Why is the ocean salty?",
        timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000), // 72 hours ago
        thumbnail: "🌊",
      },
    ],
  };

  return (
    <HomeScreen
      locale={locale as Locale}
      childName={mockData.childName}
      streakDays={mockData.streakDays}
      userProgress={mockData.userProgress}
      recentLearning={mockData.recentLearning}
    />
  );
}