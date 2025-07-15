import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { useTranslations } from "@/lib/translations";
import { getUserOnboarding } from "@/actions/onboarding";
import Link from "next/link";

export default async function AppPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { userId } = await auth();
  const t = useTranslations(locale as any);

  if (!userId) {
    redirect(`/${locale}/service/product/auth`);
  }

  const { data, error } = await getUserOnboarding(userId);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    redirect(`/${locale}/service/product/onboarding`);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t("dashboard.title")}</h1>
        <p className="text-muted-foreground">{t("dashboard.welcome")}</p>
      </div>

      {/* Lesson Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href={`/${locale}/service/product/lesson`}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              레츠고 스터디
            </h2>
          </Link>
          <p className="text-muted-foreground mb-4">
            레츠고 스터디는 레츠고 스터디는 레츠고 스터디는 레츠고 스터디는
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-xl font-semibold mb-2">{t("aiChat.title")}</h3>
          <p className="text-muted-foreground mb-4">
            {t("aiChat.description")}
          </p>
          <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90">
            {t("aiChat.button")}
          </button>
        </div>

        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-xl font-semibold mb-2">
            {t("documentAnalysis.title")}
          </h3>
          <p className="text-muted-foreground mb-4">
            {t("documentAnalysis.description")}
          </p>
          <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90">
            {t("documentAnalysis.button")}
          </button>
        </div>

        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-xl font-semibold mb-2">
            {t("imageGeneration.title")}
          </h3>
          <p className="text-muted-foreground mb-4">
            {t("imageGeneration.description")}
          </p>
          <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90">
            {t("imageGeneration.button")}
          </button>
        </div>
      </div>
    </div>
  );
}
