"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ArrowLeft, ListChecks, ShieldCheck, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

interface HeroSectionProps {
  onPrimaryClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function HeroSection({ onPrimaryClick }: HeroSectionProps) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n?.dir ? i18n.dir() === "rtl" : true;

  const features = [
    {
      icon: ShieldCheck,
      title: t("hero.features.free.title"),
      desc: t("hero.features.free.desc"),
    },
    {
      icon: Zap,
      title: t("hero.features.tracking.title"),
      desc: t("hero.features.tracking.desc"),
    },
    {
      icon: ShieldCheck,
      title: t("hero.features.security.title"),
      desc: t("hero.features.security.desc"),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [features.length]);

  const CurrentIcon = features[currentIndex].icon;

  return (
    <section
      aria-label={t("hero.ariaLabel")}
      className="relative overflow-hidden bg-[var(--color-slate-dark)] text-[var(--color-slate-ice)] pt-30 md:pt-45 pb-16 md:pb-24"
    >
      {/* ===== 1. صورة الخلفية الرئيسية ===== */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src="/pexels-beingsanshots-28122080 (1).jpg"
          alt=""
          className="h-full w-full object-cover object-center"
        />
        {/* طبقة تظليل داكنة لضمان وضوح النصوص */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* ===== 2. التدرج الخلفي الشفاف الشامل ===== */}
      <div
        className="absolute inset-0 z-1 bg-gradient-to-br from-[var(--color-slate-dark)]/80 via-[#3a1f1f]/70 to-[var(--color-slate-dark)]/90 mix-blend-multiply pointer-events-none"
        aria-hidden="true"
      />

      {/* ===== 3. الزخارف الثابتة (#84934a) ===== */}
      <div 
        className="absolute inset-0 z-1 pointer-events-none opacity-20"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(#84934a 1.2px, transparent 1.2px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div 
        className="absolute inset-0 z-1 pointer-events-none opacity-15"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(132, 147, 74, 0.25) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(132, 147, 74, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      {/* دوائر إشعاعية زجاجية */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#84934a]/15 rounded-full blur-[140px] pointer-events-none z-1"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/4 -right-20 w-[350px] h-[350px] bg-[#84934a]/10 rounded-full blur-[100px] pointer-events-none z-1"
        aria-hidden="true"
      />

      {/* ===== 4. تدرج شفاف أعلى الهيرو فقط (تم إزالة التدرج السفلي) ===== */}
      <div className="absolute inset-x-0 top-0 h-32 pointer-events-none z-2 bg-gradient-to-b from-[var(--color-slate-dark)] via-[var(--color-slate-dark)]/60 to-transparent" aria-hidden="true" />

      {/* ===== المحتوى الرئيسي ===== */}
      <div className="container-page relative z-10 max-w-5xl mx-auto">
        <div className="flex flex-col items-center text-center">

          {/* العنوان الرئيسي */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[var(--color-slate-ice)] leading-[1.25] tracking-tight max-w-4xl drop-shadow-xl"
          >
            <span className="block sm:inline whitespace-normal md:whitespace-nowrap">
              {t("hero.brandName")}
            </span>
            <span className="block mt-1 text-[var(--color-slate-light)] font-bold text-2xl sm:text-4xl md:text-5xl whitespace-nowrap">
              {t("hero.mainHeading")}
            </span>
          </motion.h1>

          {/* الوصف */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-2xl text-base sm:text-lg text-[var(--color-slate-ice)]/90 leading-relaxed font-medium drop-shadow-md"
          >
            {t("hero.subheading")}
          </motion.p>

          {/* الأزرار */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#complaint-form"
              onClick={onPrimaryClick}
              className="group inline-flex items-center justify-center gap-2.5 w-full sm:w-auto rounded-xl bg-[var(--color-slate-light)] px-8 py-4 text-base font-bold text-[var(--color-slate-dark)] shadow-[var(--shadow-glow)] transition-all duration-200 hover:bg-[var(--color-slate-ice)] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <Send className="h-4 w-4" />
              <span>{t("hero.submitBtn")}</span>
              <ArrowLeft
                className={`h-4 w-4 transition-transform duration-200 ${
                  isRtl ? "group-hover:-translate-x-1" : "rotate-180 group-hover:translate-x-1"
                }`}
              />
            </a>

            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl bg-white/10 border border-white/20 px-8 py-4 text-base font-semibold text-[var(--color-slate-ice)] shadow-xs backdrop-blur-xl transition-all duration-200 hover:bg-white/20 hover:border-white/40 active:scale-[0.98]"
            >
              <ListChecks className="h-4 w-4 text-[var(--color-slate-light)]" />
              <span>{t("hero.howItWorksBtn")}</span>
            </a>
          </motion.div>

          {/* ===== المربع التفاعلي المتنقل الشفاف ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 w-full max-w-md mx-auto"
          >
            <div className="relative h-[90px] w-full rounded-2xl bg-white/10 border border-white/20 shadow-2xl backdrop-blur-2xl overflow-hidden p-4 text-start flex items-center justify-between">

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -25 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="flex items-center gap-4 w-full"
                >
                  <div className="p-3 rounded-xl bg-[var(--color-slate-light)] text-[var(--color-slate-dark)] shrink-0 shadow-md">
                    <CurrentIcon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-[var(--color-slate-ice)] truncate">
                      {features[currentIndex].title}
                    </h3>
                    <p className="text-sm text-[var(--color-slate-ice)]/80 mt-0.5 leading-snug truncate">
                      {features[currentIndex].desc}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* مؤشرات التنقل */}
              <div className="flex flex-col gap-1.5 shrink-0 me-1">
                {features.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`w-1.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? "h-4 bg-[var(--color-slate-light)]"
                        : "h-1.5 bg-white/20 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}