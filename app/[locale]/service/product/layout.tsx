"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import { Home, BookOpen, TrendingUp, Settings } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// 메뉴 아이템 데이터
const menuItems = [
  {
    title: "홈",
    icon: Home,
    url: "/service/product",
  },
  {
    title: "학습 라이브러리",
    icon: BookOpen,
    url: "/service/product/library",
  },
  {
    title: "성장 리포트",
    icon: TrendingUp,
    url: "/service/product/reports",
  },
  {
    title: "설정",
    icon: Settings,
    url: "/service/product/settings",
  },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const locale = params.locale as string;

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b">
          <div className="flex items-center gap-2 px-4 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-sm font-semibold">U</span>
            </div>
            <span className="text-lg font-semibold">Uneseule AI</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>메뉴</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={`/${locale}${item.url}`}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t">
          <div className="flex items-center justify-between px-4 py-2">
            <UserButton afterSignOutUrl={`/${locale}/service/auth`} />
            <span className="text-sm text-muted-foreground">사용자 계정</span>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Uneseule AI 서비스</h1>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
