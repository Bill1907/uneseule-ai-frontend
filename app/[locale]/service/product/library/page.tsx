"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { getClassContents } from "@/actions/lessons";
import { ClassContent } from "@/lib/database.types";
import { getTranslations, type Locale } from "@/lib/translations";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageLoadingScreen } from "@/components/loading-screen";

type GroupedClassContents = {
  [category: string]: ClassContent[];
};

export default function LibraryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const router = useRouter();
  const { user } = useUser();
  const [locale, setLocale] = useState<string>("");
  const [classContents, setClassContents] = useState<ClassContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    params.then((p) => setLocale(p.locale));
  }, [params]);

  useEffect(() => {
    if (!user) {
      if (locale) {
        router.push(`/${locale}/service/auth`);
      }
      return;
    }

    const fetchClassContents = async () => {
      try {
        const { data, error } = await getClassContents();
        if (error) {
          setError(error);
        } else {
          setClassContents(data || []);
        }
      } catch {
        setError("Failed to load class contents");
      } finally {
        setLoading(false);
      }
    };

    fetchClassContents();
  }, [user, locale, router]);

  const t = getTranslations(locale as Locale);

  if (loading) {
    return <PageLoadingScreen />;
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">{t("library.title")}</h1>
          <p className="text-muted-foreground">{t("library.loadError")}</p>
        </div>
      </div>
    );
  }

  // Group class contents by category
  const groupedContents: GroupedClassContents = classContents.reduce(
    (acc, content) => {
      const category = content.category || t("library.other");
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(content);
      return acc;
    },
    {} as GroupedClassContents
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">{t("library.title")}</h1>
        <p className="text-muted-foreground">{t("library.subtitle")}</p>
      </div>

      {Object.entries(groupedContents).map(([category, contents]) => (
        <div key={category} className="space-y-4">
          <h2 className="text-xl font-semibold">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contents.map((content) => (
              <Card
                key={content.id}
                className="cursor-pointer transition-all hover:shadow-xl"
                onClick={() =>
                  router.push(`/${locale}/service/product/class/${content.id}`)
                }
              >
                <CardHeader>
                  <CardTitle>{content.title}</CardTitle>
                  <CardDescription>
                    {content.description || t("library.noDescription")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {content.difficulty && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {t("library.difficulty")}:
                      </span>
                      <span className="text-sm font-medium">
                        {content.difficulty}
                      </span>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    {t("library.startLearning")}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {Object.keys(groupedContents).length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t("library.noContent")}</p>
        </div>
      )}
    </div>
  );
}
