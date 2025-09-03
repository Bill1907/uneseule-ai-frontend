import { Suspense } from "react";
import GoogleSlideViewer from "@/components/google-slide-viewer";
import VoiceAgentPanel from "@/components/voice-agent-panel";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserOnboarding } from "@/actions/onboarding";
import { getClassContent } from "@/actions/lessons";
import { getTranslations, type Locale } from "@/lib/translations";
import { LoadingSpinner } from "@/components/loading-screen";
// Google Slides API is now handled by Edge Function

export default async function ClassPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const user = await currentUser();
  const t = getTranslations(locale as Locale);

  if (!user) {
    redirect(`/${locale}/service/auth`);
  }

  const { data: onboardingData, error: onboardingError } =
    await getUserOnboarding(user.id);

  if (onboardingError) {
    redirect(`/${locale}/service/product/onboarding`);
  }

  const { data: classContent, error: classError } = await getClassContent(id);

  // const testServer = async () => {
  //   const response = await fetch(
  //     `http://localhost:8080/class-content/${id}/update-slides`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   const data = await response.json();
  //   console.log(data);
  // };
  // testServer();

  if (classError || !classContent) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t("class.notFound")}</h1>
          <p className="text-muted-foreground mb-6">
            {t("class.notFoundDescription")}
          </p>
          <a
            href={`/${locale}/service/product/library`}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            {t("class.backToLibrary")}
          </a>
        </div>
      </div>
    );
  }

  console.log(classContent);
  // Prepare dynamic variables for the voice agent
  const dynamicVariables = {
    userName: user.fullName || "",
    age: onboardingData?.age || 0,
    sex: onboardingData?.sex || "",
    learningLanguage: onboardingData?.learning_language || "",
    languageLevel: onboardingData?.language_level || "",
    learningGoals: onboardingData?.learning_goals || "",
    tutorStyle: onboardingData?.tutor_style || "",
    feedbackStyle: onboardingData?.feedback_style || "",
    interests: onboardingData?.interests.join(", ") || "",
    lessonTitle: classContent.title,
    lessonDescription: classContent.description || "",
    lessonCategory: classContent.category || "",
    lessonDifficulty: classContent.difficulty || "",
    lessonSlides: classContent.slide_details?.slides
      ? JSON.stringify(classContent.slide_details?.slides)
      : "",
  };

  if (!classContent.slides_id) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t("class.noSlides")}</h1>
          <p className="text-muted-foreground mb-6">
            {t("class.noSlidesDescription")}
          </p>
          <a
            href={`/${locale}/service/product/library`}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            {t("class.backToLibrary")}
          </a>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-full flex">
      {/* Left: GoogleSlideViewer */}
      <div className="w-2/3 h-full">
        <Suspense fallback={<LoadingSpinner />}>
          <GoogleSlideViewer presentationId={classContent.slides_id} />
        </Suspense>
      </div>
      {/* Right: AI Voice Conversation Area */}
      <div className="w-1/3 h-full border-l">
        <Suspense fallback={<LoadingSpinner />}>
          <VoiceAgentPanel dynamicVariables={dynamicVariables} />
        </Suspense>
      </div>
    </div>
  );
}
