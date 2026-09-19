"use client";

import { Link } from "@tanstack/react-router";
import { Mail, ShieldCheck, ArrowUpRight, PhoneCall } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <footer className="relative overflow-hidden bg-[var(--color-slate-dark)] text-[var(--color-slate-ice)] pt-16 pb-8 border-t border-white/10">
      {/* خلفية تدرج ناعمة للإضاءة الجانبية */}
      <div 
        className="absolute top-0 right-1/4 w-[400px] h-[250px] bg-[var(--color-slate-light)]/10 rounded-full blur-[140px] pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-0 left-10 w-[300px] h-[200px] bg-[#3a1f1f]/20 rounded-full blur-[120px] pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="container-page relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* القسم العلوي: الشبكة الرئيسية */}
        <div className="grid gap-10 lg:grid-cols-12 pb-12 border-b border-white/10">
          
          {/* العمود الأول: اللوجو والوصف والشارة الرسمية */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link 
                to="/" 
                className="group inline-flex items-center gap-3 transition-transform duration-200 active:scale-95"
              >
                <img 
                  src="/The-Emirates.svg" 
                  alt={t("logoAlt")} 
                  width={48} 
                  height={48} 
                  className="h-11 w-auto shrink-0 object-contain brightness-0 invert transition-transform group-hover:scale-105" 
                  loading="lazy"
                />
                <span className={cn(
                  "text-lg md:text-xl font-black text-[var(--color-slate-ice)] leading-tight tracking-tight",
                  isAr ? "border-r border-white/20 pr-3" : "border-l border-white/20 pl-3"
                )}>
                  {t("siteTitle")}
                </span>
              </Link>

              <p className="mt-4 max-w-sm text-xs md:text-sm leading-relaxed text-[var(--color-slate-ice)]/80 font-medium">
                {t("footer.description")}
              </p>
            </div>

            {/* بطاقة المصداقية والأمان */}
            <div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 p-3 max-w-xs backdrop-blur-md">
              <div className="p-2 rounded-xl bg-[var(--color-slate-light)] text-[var(--color-slate-dark)] shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-[var(--color-slate-ice)]">{t("footer.officialPortal", "منصة حماية المستهلك")}</p>
                <p className="text-[var(--color-slate-ice)]/70 text-[11px] mt-0.5">{t("footer.encrypted", "مشفرة ببروتوكولات عالية الأمان")}</p>
              </div>
            </div>
          </div>

          {/* العمود الثاني: روابط سريعة */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-[var(--color-slate-light)]">
              {t("footer.quickLinks")}
            </h3>
            <ul className="mt-4 space-y-3 text-xs md:text-sm font-semibold text-[var(--color-slate-ice)]/80">
              <li>
                <Link to="/about" className="inline-flex items-center gap-1 transition-colors hover:text-[var(--color-slate-light)]">
                  <span>{t("nav.about")}</span>
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="inline-flex items-center gap-1 transition-colors hover:text-[var(--color-slate-light)]">
                  <span>{t("nav.howItWorks")}</span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="inline-flex items-center gap-1 transition-colors hover:text-[var(--color-slate-light)]">
                  <span>{t("nav.faq")}</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="inline-flex items-center gap-1 transition-colors hover:text-[var(--color-slate-light)]">
                  <span>{t("nav.contact")}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود الثالث: السياسات والتواصل */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[var(--color-slate-light)]">
                {t("footer.legal")} & {t("nav.contact")}
              </h3>
              <ul className="mt-4 space-y-3 text-xs md:text-sm font-semibold text-[var(--color-slate-ice)]/80">
                <li>
                  <Link to="/privacy" className="transition-colors hover:text-[var(--color-slate-light)]">
                    {t("footer.privacy")}
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="transition-colors hover:text-[var(--color-slate-light)]">
                    {t("footer.terms")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* صندوق التواصل البريدي المباشر */}
            <div className="mt-6">
              <a 
                href="mailto:moetshakawi-uae@gmail.com" 
                className="group flex items-center justify-between rounded-xl bg-white/5 border border-white/10 p-3.5 transition-all duration-300 hover:bg-white/10 hover:border-white/20 active:scale-[0.98]"
                dir="ltr"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/10 text-[var(--color-slate-light)] group-hover:bg-[var(--color-slate-light)] group-hover:text-[var(--color-slate-dark)] transition-colors">
                    <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </div>
                  <span className="text-xs md:text-sm font-bold text-[var(--color-slate-ice)] tracking-wide">
                    moetshakawi-uae@gmail.com
                  </span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[var(--color-slate-ice)]/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-slate-light)]" />
              </a>
            </div>
          </div>

        </div>

        {/* القسم السفلي: حقوق النشر والإخلاء */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-[var(--color-slate-ice)]/60">
          <p className="text-center md:text-start">
            © {currentYear} <span className="text-[var(--color-slate-ice)] font-bold">{t("siteTitle")}</span>. {t("footer.rights")}
          </p>
          <p className="text-center md:text-end max-w-md text-[11px] leading-relaxed text-[var(--color-slate-ice)]/50">
            {t("footer.disclaimer")}
          </p>
        </div>

      </div>
    </footer>
  );
}