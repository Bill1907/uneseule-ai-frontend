import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/lib/translations";

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = useTranslations(locale as any);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
            <span className="text-primary">Uneseule</span> AI
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("landing.hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/service`}>
              <Button size="lg" className="w-full sm:w-auto">
                {t("landing.hero.startButton")}
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              {t("landing.hero.learnMoreButton")}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t("landing.features.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("landing.features.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-background rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("landing.features.smartAI.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("landing.features.smartAI.description")}
              </p>
            </div>
            <div className="text-center p-6 bg-background rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("landing.features.fastResponse.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("landing.features.fastResponse.description")}
              </p>
            </div>
            <div className="text-center p-6 bg-background rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("landing.features.security.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("landing.features.security.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t("landing.cta.title")}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("landing.cta.subtitle")}
          </p>
          <Link href={`/${locale}/service`}>
            <Button size="lg" className="text-lg px-8 py-4">
              {t("landing.cta.button")}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
