"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Globe, Loader2 } from "lucide-react";

const languages = [
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

export default function LanguageToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 현재 locale을 URL에서 추출
  const currentLocale = pathname.split("/")[1] || "ko";
  const currentLanguage =
    languages.find((lang) => lang.code === currentLocale) || languages[0];

  // 외부 클릭시 드롭다운 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // ESC 키로 드롭다운 닫기
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    startTransition(() => {
      const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
      router.replace(newPath);
      setIsOpen(false);
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
        disabled={isPending}
        aria-label="언어 선택"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {isPending ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Globe size={16} />
        )}
        <span>{currentLanguage.flag}</span>
        <span className="hidden sm:inline">{currentLanguage.name}</span>
      </Button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50 fade-in"
          role="listbox"
          aria-label="언어 목록"
        >
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleLanguageChange(language.code);
                  }
                }}
                disabled={isPending}
                role="option"
                aria-selected={language.code === currentLocale}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 disabled:opacity-50 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700 ${
                  language.code === currentLocale
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <span>{language.flag}</span>
                <span>{language.name}</span>
                {language.code === currentLocale && (
                  <span className="ml-auto text-sm text-gray-500">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
