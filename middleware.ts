import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const locales = ["ko", "en", "es"];
const defaultLocale = "ko";

const isProtectedRoute = createRouteMatcher(["/:locale/service/product(.*)"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  if (isProtectedRoute(req)) {
    const { userId } = await auth();

    if (!userId) {
      // 현재 locale 추출
      const locale = req.nextUrl.pathname.split("/")[1];
      const validLocale = locales.includes(locale as any)
        ? locale
        : defaultLocale;

      // 인증되지 않은 사용자는 해당 locale의 auth 페이지로 리디렉션
      return Response.redirect(
        new URL(`/${validLocale}/service/auth`, req.url)
      );
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
