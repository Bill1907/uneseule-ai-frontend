import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignIn } from "@clerk/nextjs";

export default async function AuthPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { userId } = await auth();

  if (userId) {
    redirect(`/${locale}/service/product`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Uneseule AI 서비스</h2>
          <p className="mt-2 text-muted-foreground">
            서비스를 이용하려면 로그인이 필요합니다
          </p>
        </div>

        <SignIn
          afterSignInUrl={`/${locale}/service/product`}
          afterSignUpUrl={`/${locale}/service/product`}
          routing="hash"
          appearance={{
            elements: {
              formButtonPrimary: "bg-primary hover:bg-primary/90",
              card: "shadow-sm",
            },
          }}
        />
      </div>
    </div>
  );
}
