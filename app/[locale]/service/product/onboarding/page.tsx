"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { getTranslations, type Locale } from "@/lib/translations";
import { useSupabaseClient } from "@/hooks/use-supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface OnboardingForm {
  age: number;
  learningLanguage: string;
  sex: string;
  learningGoals: string;
  languageLevel: string;
  interests: string[];
  tutorStyle: string;
  feedbackStyle: string;
}

export default function OnboardingPage() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const supabase = useSupabaseClient();

  // Extract locale from pathname
  const extractedLocale = pathname.split("/")[1];
  const locale = ["ko", "en", "es"].includes(extractedLocale)
    ? extractedLocale
    : "ko";

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<OnboardingForm>({
    age: 0,
    learningLanguage: "",
    sex: "",
    learningGoals: "",
    languageLevel: "",
    interests: [],
    tutorStyle: "",
    feedbackStyle: "",
  });

  const t = getTranslations(locale as Locale);

  const handleInputChange = (
    field: keyof OnboardingForm,
    value: string | number | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) {
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.from("user_onboarding").insert({
        clerk_user_id: user.id,
        age: formData.age,
        learning_language: formData.learningLanguage,
        sex: formData.sex,
        learning_goals: formData.learningGoals,
        language_level: formData.languageLevel,
        interests: formData.interests,
        tutor_style: formData.tutorStyle,
        feedback_style: formData.feedbackStyle,
      });

      if (error) {
        throw error;
      }

      // Redirect to main product page after successful onboarding
      router.push(`/${locale}/service/product`);
    } catch (error) {
      console.error("Error completing onboarding:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    formData.age > 0 &&
    formData.learningLanguage.trim() !== "" &&
    formData.sex.trim() !== "" &&
    formData.learningGoals.trim() !== "" &&
    formData.languageLevel.trim() !== "" &&
    formData.interests.length > 0 &&
    formData.tutorStyle.trim() !== "" &&
    formData.feedbackStyle.trim() !== "";

  const availableInterests = [
    "culture",
    "business",
    "travel",
    "technology",
    "sports",
    "music",
    "movies",
    "cooking",
    "books",
    "science",
    "art",
    "games",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-2xl w-full mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">{t("onboarding.title")}</h1>
          <p className="text-muted-foreground mt-2">
            {t("onboarding.subtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Age */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium mb-2">
              {t("onboarding.age")}
            </label>
            <Input
              id="age"
              type="number"
              min="1"
              max="120"
              value={formData.age || ""}
              onChange={(e) =>
                handleInputChange("age", parseInt(e.target.value) || 0)
              }
              placeholder={t("onboarding.agePlaceholder")}
              required
            />
          </div>

          {/* Learning Language */}
          <div>
            <label
              htmlFor="learningLanguage"
              className="block text-sm font-medium mb-2"
            >
              {t("onboarding.learningLanguage")}
            </label>
            <select
              id="learningLanguage"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.learningLanguage}
              onChange={(e) =>
                handleInputChange("learningLanguage", e.target.value)
              }
              required
            >
              <option value="">{t("onboarding.selectLanguage")}</option>
              <option value="english">English</option>
              <option value="korean">한국어 (Korean)</option>
              <option value="spanish">Español (Spanish)</option>
              <option value="french">Français (French)</option>
              <option value="german">Deutsch (German)</option>
              <option value="japanese">日本語 (Japanese)</option>
              <option value="chinese">中文 (Chinese)</option>
            </select>
          </div>

          {/* Sex */}
          <div>
            <label htmlFor="sex" className="block text-sm font-medium mb-2">
              {t("onboarding.sex")}
            </label>
            <select
              id="sex"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.sex}
              onChange={(e) => handleInputChange("sex", e.target.value)}
              required
            >
              <option value="">{t("onboarding.selectSex")}</option>
              <option value="male">{t("onboarding.male")}</option>
              <option value="female">{t("onboarding.female")}</option>
              <option value="other">{t("onboarding.other")}</option>
              <option value="prefer_not_to_say">
                {t("onboarding.preferNotToSay")}
              </option>
            </select>
          </div>

          {/* Learning Goals */}
          <div>
            <label
              htmlFor="learningGoals"
              className="block text-sm font-medium mb-2"
            >
              {t("onboarding.learningGoals")}
            </label>
            <textarea
              id="learningGoals"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.learningGoals}
              onChange={(e) =>
                handleInputChange("learningGoals", e.target.value)
              }
              placeholder={t("onboarding.learningGoalsPlaceholder")}
              required
            />
          </div>

          {/* Language Level */}
          <div>
            <label
              htmlFor="languageLevel"
              className="block text-sm font-medium mb-2"
            >
              {t("onboarding.languageLevel")}
            </label>
            <select
              id="languageLevel"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.languageLevel}
              onChange={(e) =>
                handleInputChange("languageLevel", e.target.value)
              }
              required
            >
              <option value="">{t("onboarding.selectLevel")}</option>
              <option value="beginner">{t("onboarding.beginner")}</option>
              <option value="elementary">{t("onboarding.elementary")}</option>
              <option value="intermediate">
                {t("onboarding.intermediate")}
              </option>
              <option value="upper_intermediate">
                {t("onboarding.upperIntermediate")}
              </option>
              <option value="advanced">{t("onboarding.advanced")}</option>
              <option value="proficient">{t("onboarding.proficient")}</option>
            </select>
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {t("onboarding.interests")}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {availableInterests.map((interest) => (
                <label
                  key={interest}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.interests.includes(interest)}
                    onChange={() => handleInterestToggle(interest)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">
                    {t(`onboarding.interestOptions.${interest}`)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Tutor Style */}
          <div>
            <label
              htmlFor="tutorStyle"
              className="block text-sm font-medium mb-2"
            >
              {t("onboarding.tutorStyle")}
            </label>
            <select
              id="tutorStyle"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.tutorStyle}
              onChange={(e) => handleInputChange("tutorStyle", e.target.value)}
              required
            >
              <option value="">{t("onboarding.selectTutorStyle")}</option>
              <option value="encouraging">
                {t("onboarding.tutorStyles.encouraging")}
              </option>
              <option value="challenging">
                {t("onboarding.tutorStyles.challenging")}
              </option>
              <option value="patient">
                {t("onboarding.tutorStyles.patient")}
              </option>
              <option value="structured">
                {t("onboarding.tutorStyles.structured")}
              </option>
              <option value="conversational">
                {t("onboarding.tutorStyles.conversational")}
              </option>
            </select>
          </div>

          {/* Feedback Style */}
          <div>
            <label
              htmlFor="feedbackStyle"
              className="block text-sm font-medium mb-2"
            >
              {t("onboarding.feedbackStyle")}
            </label>
            <select
              id="feedbackStyle"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.feedbackStyle}
              onChange={(e) =>
                handleInputChange("feedbackStyle", e.target.value)
              }
              required
            >
              <option value="">{t("onboarding.selectFeedbackStyle")}</option>
              <option value="immediate">
                {t("onboarding.feedbackStyles.immediate")}
              </option>
              <option value="summary">
                {t("onboarding.feedbackStyles.summary")}
              </option>
              <option value="gentle">
                {t("onboarding.feedbackStyles.gentle")}
              </option>
              <option value="detailed">
                {t("onboarding.feedbackStyles.detailed")}
              </option>
              <option value="motivational">
                {t("onboarding.feedbackStyles.motivational")}
              </option>
            </select>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? t("onboarding.completing") : t("onboarding.complete")}
          </Button>
        </form>
      </div>
    </div>
  );
}
