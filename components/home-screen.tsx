"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getTranslations, type Locale } from "@/lib/translations";
import VideoHero from "@/components/video-hero";

// Brand color constants
const BRAND_COLORS = {
  yellow: "#ffc550",
  yellowLight: "#ffdb8a",
  yellowDark: "#e6b148",
  blue: "#3867bc",
  blueLight: "#5a82d1",
  blueDark: "#2d56a8",
  pink: "#ff5d63",
  pinkLight: "#ff8a8f",
  pinkDark: "#e65459",
} as const;

// Mock data interfaces
interface UserProgress {
  weeklyConversations: number;
  growthPoints: number;
  thinkingOutput: number;
  questionsCreated: number;
}

interface RecentLearning {
  id: string;
  title: string;
  timestamp: Date;
  thumbnail: string;
}

interface Activity {
  id: string;
  titleKey: string;
  descKey: string;
  icon: string;
  color: keyof typeof BRAND_COLORS;
}

interface HomeScreenProps {
  locale: Locale;
  childName?: string;
  streakDays?: number;
  userProgress?: UserProgress;
  recentLearning?: RecentLearning[];
}

const activities: Activity[] = [
  {
    id: "art",
    titleKey: "activities.art",
    descKey: "activities.artDesc",
    icon: "🎨",
    color: "yellow",
  },
  {
    id: "nature",
    titleKey: "activities.nature",
    descKey: "activities.natureDesc",
    icon: "🌱",
    color: "blue",
  },
  {
    id: "imagination",
    titleKey: "activities.imagination",
    descKey: "activities.imaginationDesc",
    icon: "💭",
    color: "pink",
  },
];

const formatRelativeTime = (date: Date, locale: Locale): string => {
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 24) {
    return locale === "ko" ? "오늘" : locale === "en" ? "Today" : "Hoy";
  } else if (diffInHours < 48) {
    return locale === "ko" ? "어제" : locale === "en" ? "Yesterday" : "Ayer";
  } else {
    const days = Math.floor(diffInHours / 24);
    return locale === "ko"
      ? `${days}일 전`
      : locale === "en"
        ? `${days} days ago`
        : `Hace ${days} días`;
  }
};

export default function HomeScreen({
  locale,
  childName = "작은 친구",
  streakDays = 7,
  userProgress = {
    weeklyConversations: 12,
    growthPoints: 240,
    thinkingOutput: 450,
    questionsCreated: 18,
  },
  recentLearning = [
    {
      id: "1",
      title: "우주는 얼마나 클까?",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      thumbnail: "🚀",
    },
    {
      id: "2",
      title: "공룡은 왜 사라졌을까?",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      thumbnail: "🦕",
    },
    {
      id: "3",
      title: "비는 어떻게 만들어질까?",
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
      thumbnail: "🌧️",
    },
  ],
}: HomeScreenProps) {
  const t = getTranslations(locale);
  const [animatedCounts, setAnimatedCounts] = useState({
    conversations: 0,
    points: 0,
    words: 0,
    questions: 0,
  });

  // Animate counters on mount
  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const interval = duration / steps;

    const targets = {
      conversations: userProgress.weeklyConversations,
      points: userProgress.growthPoints,
      words: userProgress.thinkingOutput,
      questions: userProgress.questionsCreated,
    };

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setAnimatedCounts({
        conversations: Math.floor(targets.conversations * easeOutQuart),
        points: Math.floor(targets.points * easeOutQuart),
        words: Math.floor(targets.words * easeOutQuart),
        questions: Math.floor(targets.questions * easeOutQuart),
      });

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedCounts(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [userProgress]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50/30 via-blue-50/20 to-pink-50/30">
      {/* Header Section */}
      <header className="flex items-center justify-between p-4 sm:p-6">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold">
            <span className="text-3xl">🎓</span>
            <span className="ml-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              UneSeule AI
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div
            className="flex items-center space-x-2 px-3 py-2 rounded-full animate-pulse"
            style={{ backgroundColor: `${BRAND_COLORS.yellowLight}20` }}
          >
            <span className="text-lg">🔥</span>
            <span
              className="font-semibold text-sm"
              style={{ color: BRAND_COLORS.yellowDark }}
            >
              {t("home.streak", { days: streakDays })}
            </span>
          </div>

          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center">
            <span className="text-white text-lg">👶</span>
          </div>
        </div>
      </header>

      {/* Greeting */}
      <div className="px-4 sm:px-6 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center">
          {t("home.greeting", { name: childName })}
        </h1>
      </div>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 mb-8">
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-lg">
          <div className="flex flex-col items-center space-y-6">
            {/* Video Hero replacing AI Character */}
            <div className="relative">
              <VideoHero
                videoSrc="/videos/ai-hero.mp4"
                videoSrcWebM="/videos/ai-hero.webm"
                fallbackSrc="/images/ai-hero-fallback.png"
                className="w-40 h-40 rounded-full overflow-hidden shadow-xl"
              />
            </div>

            {/* Start Button */}
            <Button
              size="lg"
              className={cn(
                "h-14 px-8 text-lg font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-pulse min-w-[180px]"
              )}
              style={{
                backgroundColor: BRAND_COLORS.blue,
                color: "white",
                boxShadow: `0 8px 32px ${BRAND_COLORS.blue}40`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = BRAND_COLORS.blueDark;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = BRAND_COLORS.blue;
              }}
            >
              <span className="mr-2">🎤</span>
              {t("home.startButton")}
            </Button>
          </div>
        </div>
      </section>

      {/* Daily Quest Cards */}
      <section className="px-4 sm:px-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">🎯 오늘의 모험</h2>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex-shrink-0 w-72 bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              style={{
                borderTop: `4px solid ${BRAND_COLORS[activity.color]}`,
              }}
            >
              <div className="flex items-start space-x-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{
                    backgroundColor: `${BRAND_COLORS[activity.color]}20`,
                  }}
                >
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {t(activity.titleKey)}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {t(activity.descKey)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Progress Dashboard */}
      <section className="px-4 sm:px-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">📊 나의 성장</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
            <div className="flex items-center space-x-3 mb-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${BRAND_COLORS.yellow}20` }}
              >
                <span style={{ color: BRAND_COLORS.yellowDark }}>⭐</span>
              </div>
              <span className="text-sm font-medium text-gray-700">
                {t("progress.weeklyConversations")}
              </span>
            </div>
            <div
              className="text-2xl font-bold"
              style={{ color: BRAND_COLORS.yellowDark }}
            >
              {animatedCounts.conversations}
            </div>
            <div className="text-xs text-gray-500">
              {t("progress.conversations")}
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
            <div className="flex items-center space-x-3 mb-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${BRAND_COLORS.blue}20` }}
              >
                <span style={{ color: BRAND_COLORS.blueDark }}>🌱</span>
              </div>
              <span className="text-sm font-medium text-gray-700">
                {t("progress.growthPoints")}
              </span>
            </div>
            <div
              className="text-2xl font-bold"
              style={{ color: BRAND_COLORS.blueDark }}
            >
              {animatedCounts.points}
            </div>
            <div className="text-xs text-gray-500">{t("progress.points")}</div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
            <div className="flex items-center space-x-3 mb-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${BRAND_COLORS.pink}20` }}
              >
                <span style={{ color: BRAND_COLORS.pinkDark }}>📊</span>
              </div>
              <span className="text-sm font-medium text-gray-700">
                {t("progress.thinkingOutput")}
              </span>
            </div>
            <div
              className="text-2xl font-bold"
              style={{ color: BRAND_COLORS.pinkDark }}
            >
              {animatedCounts.words}
            </div>
            <div className="text-xs text-gray-500">{t("progress.words")}</div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
            <div className="flex items-center space-x-3 mb-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${BRAND_COLORS.yellow}20` }}
              >
                <span style={{ color: BRAND_COLORS.yellowDark }}>💡</span>
              </div>
              <span className="text-sm font-medium text-gray-700">
                {t("progress.questionsCreated")}
              </span>
            </div>
            <div
              className="text-2xl font-bold"
              style={{ color: BRAND_COLORS.yellowDark }}
            >
              {animatedCounts.questions}
            </div>
            <div className="text-xs text-gray-500">
              {t("progress.questions")}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Learning History */}
      <section className="px-4 sm:px-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {t("home.recentLearning")}
        </h2>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {recentLearning.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-64 bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-200/50"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-2xl">
                  {item.thumbnail}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {formatRelativeTime(item.timestamp, locale)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Parent Section */}
      <section className="px-4 sm:px-6 pb-8">
        <div className="bg-gray-50/50 backdrop-blur-sm rounded-2xl p-4 space-y-3">
          <h3 className="text-sm font-medium text-gray-600 mb-3">
            👨‍👩‍👧‍👦 부모님을 위한 정보
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="ghost"
              className="justify-start p-3 h-auto bg-white/50 hover:bg-white/80 rounded-xl border border-gray-200/50"
            >
              <span className="mr-2">📈</span>
              <span className="text-sm text-gray-700">
                {t("parent.todayInsights")}
              </span>
            </Button>

            <Button
              variant="ghost"
              className="justify-start p-3 h-auto bg-white/50 hover:bg-white/80 rounded-xl border border-gray-200/50"
            >
              <span className="mr-2">📊</span>
              <span className="text-sm text-gray-700">
                {t("parent.growthReport")}
              </span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
