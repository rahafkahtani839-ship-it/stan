"use client";

import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, ArrowLeft, ArrowRight, ShieldCheck, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, i18n } = useTranslation();

  const isAr = i18n.language === "ar";

  const navItems = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    { to: "/how-it-works", label: t("nav.howItWorks") },
    { to: "/faq", label: t("nav.faq") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  const toggleLanguage = () => {
    const nextLang = isAr ? "en" : "ar";
    i18n.changeLanguage(nextLang);
  };

  // مراقبة السكرول لتطبيق خلفية متدرجة زجاجية وانيقة
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b border-white/10 bg-[var(--color-slate-dark)]/85 backdrop-blur-xl shadow-lg py-0"
          : "bg-transparent border-b border-transparent py-2"
      )}
    >
      <div className="container-page flex h-20 items-center justify-between px-4 sm:px-6">
        
        {/* اللوجو والعنوان */}
        <div className="flex items-center justify-start shrink-0">
          <Link 
            to="/" 
            className="group flex items-center gap-3 transition-transform duration-200 active:scale-95"
          >
            <img 
              src="/The-Emirates.svg" 
              alt={t("logoAlt")} 
              className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 brightness-0 invert" 
              // @ts-ignore
              fetchpriority="high"
            />
            <span className={cn(
              "text-sm md:text-base font-black text-[var(--color-slate-ice)] leading-tight tracking-tight drop-shadow-sm",
              isAr ? "border-r border-white/20 pr-3 pl-0" : "border-l border-white/20 pl-3 pr-0"
            )}>
              {t("siteTitle")}
            </span>
          </Link>
        </div>

        {/* قائمة التنقل الرئيسية */}
        <div className="hidden md:flex justify-center items-center flex-1 mx-6">
          <nav 
            aria-label={t("navAria")}
            className="flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 backdrop-blur-md shadow-inner"
          >
            {navItems.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-4 py-1.5 rounded-full text-sm font-semibold text-[var(--color-slate-ice)]/80 transition-all duration-200 hover:text-[var(--color-slate-ice)] hover:bg-white/10 whitespace-nowrap"
                activeProps={{ 
                  className: "text-[var(--color-slate-dark)] font-bold bg-[var(--color-slate-light)] shadow-xs hover:bg-[var(--color-slate-light)] hover:text-[var(--color-slate-dark)]" 
                }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* أزرار الأكشن */}
        <div className="flex items-center justify-end gap-3 shrink-0">
          
          {/* زر اختيار اللغة */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="hidden md:flex items-center gap-2 rounded-xl bg-white/5 border border-white/15 px-3.5 py-2.5 text-xs font-bold text-[var(--color-slate-ice)] hover:bg-white/15 hover:border-white/30 transition-all active:scale-95 shadow-xs"
            title={isAr ? "Switch to English" : "التحويل للغة العربية"}
          >
            <Globe className="h-4 w-4 text-[var(--color-slate-light)]" />
            <span>{isAr ? "English" : "عربي"}</span>
          </button>

          {/* زر تقديم الشكوى */}
          <div className="hidden md:flex items-center">
            <Link
              to="/"
              hash="complaint-form"
              className="group inline-flex items-center gap-2 rounded-xl bg-[var(--color-slate-light)] px-5 py-2.5 text-xs font-bold text-[var(--color-slate-dark)] transition-all duration-300 hover:bg-[var(--color-slate-ice)] hover:shadow-[var(--shadow-glow)] active:scale-[0.98] shadow-md"
            >
              <ShieldCheck className="h-4 w-4 shrink-0 transition-transform group-hover:rotate-12" aria-hidden="true" />
              <span>{t("submitComplaint")}</span>
              {isAr ? (
                <ArrowLeft className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true" />
              ) : (
                <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              )}
            </Link>
          </div>

          {/* زر القائمة للموبايل */}
          <button
            type="button"
            className="p-2 text-[var(--color-slate-ice)] md:hidden focus:outline-none rounded-lg bg-white/5 border border-white/10"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* القائمة الجانبية للموبايل */}
      <div 
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[var(--color-slate-dark)]/95 border-b border-white/10 backdrop-blur-2xl px-4", 
          open ? "max-h-[400px] opacity-100 py-4" : "max-h-0 opacity-0 py-0 border-none"
        )}
      >
        <div className="flex flex-col gap-2">
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded-xl text-sm font-bold text-[var(--color-slate-ice)]/90 hover:bg-white/10 transition-colors"
              activeProps={{ className: "text-[var(--color-slate-dark)] font-bold bg-[var(--color-slate-light)]" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}

          <div className="pt-2 border-t border-white/10 flex flex-col gap-2 mt-1">
            <button
              type="button"
              onClick={() => {
                toggleLanguage();
                setOpen(false);
              }}
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-sm font-bold text-[var(--color-slate-ice)]"
            >
              <span className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-[var(--color-slate-light)]" />
                {t("changeLanguage", "تغيير اللغة")}
              </span>
              <span className="text-xs font-black bg-[var(--color-slate-light)] text-[var(--color-slate-dark)] px-2 py-1 rounded-md">
                {isAr ? "English" : "عربي"}
              </span>
            </button>

            <Link
              to="/"
              hash="complaint-form"
              onClick={() => setOpen(false)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-slate-light)] px-5 py-3 text-sm font-bold text-[var(--color-slate-dark)] shadow-md"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>{t("submitComplaintNow")}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}