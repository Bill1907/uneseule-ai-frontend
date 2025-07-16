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
  customLearningGoal: string;
  languageLevel: string;
  interests: string[];
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
    customLearningGoal: "",
    languageLevel: "",
    interests: [],
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
      const finalLearningGoals =
        formData.learningGoals === "other"
          ? formData.customLearningGoal
          : formData.learningGoals;

      const { error } = await supabase.from("user_onboarding").insert({
        clerk_user_id: user.id,
        age: formData.age,
        learning_language: formData.learningLanguage,
        sex: formData.sex,
        learning_goals: finalLearningGoals,
        language_level: formData.languageLevel,
        interests: formData.interests,
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
    (formData.learningGoals !== "other" ||
      formData.customLearningGoal.trim() !== "") &&
    formData.languageLevel.trim() !== "" &&
    formData.interests.length > 0;

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
            <label className="block text-sm font-medium mb-2">
              {t("onboarding.learningGoals")}
            </label>
            <div className="space-y-3">
              {(["confidence", "thinking", "skills", "other"] as const).map(
                (goal) => (
                  <label
                    key={goal}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="learningGoals"
                      value={goal}
                      checked={formData.learningGoals === goal}
                      onChange={(e) =>
                        handleInputChange("learningGoals", e.target.value)
                      }
                      className="rounded border-gray-300"
                      required
                    />
                    <span className="text-sm">
                      {t(`onboarding.learningGoalOptions.${goal}`)}
                    </span>
                  </label>
                )
              )}
            </div>

            {/* Custom goal input - shown when "other" is selected */}
            {formData.learningGoals === "other" && (
              <div className="mt-3">
                <Input
                  type="text"
                  value={formData.customLearningGoal}
                  onChange={(e) =>
                    handleInputChange("customLearningGoal", e.target.value)
                  }
                  placeholder={t("onboarding.customGoalPlaceholder")}
                  required={formData.learningGoals === "other"}
                />
              </div>
            )}
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
