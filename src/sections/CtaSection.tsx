"use client";

import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface CtaSectionProps {
  onPrimaryClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function CtaSection({ onPrimaryClick }: CtaSectionProps) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n?.dir ? i18n.dir() === "rtl" : true;
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="relative overflow-hidden bg-[var(--color-background)] pt-16 pb-20 md:pt-24 md:pb-28">
      {/* لمسة إضاءة ناعمة خلف الكرت لدمجه مع الخلفية */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[var(--color-slate-light)]/15 rounded-full blur-[140px] pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="container-page relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[var(--color-slate-dark)] via-[#2a1717] to-[var(--color-slate-dark)] p-8 sm:p-12 md:p-16 text-center text-[var(--color-slate-ice)] shadow-2xl backdrop-blur-2xl"
        >
          {/* شريط عنابي/زيتوني علوي لتنسيق الحافة مع الفوتر */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-slate-light)] to-transparent opacity-80" />

          {/* خلفية شبكية نقطية أنيقة */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-10" 
            aria-hidden="true"
            style={{
              backgroundImage: `radial-gradient(var(--color-slate-light) 1.2px, transparent 1.2px)`,
              backgroundSize: "24px 24px",
            }}
          />

          {/* بقع إضاءة داخلية متدرجة */}
          <div 
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[var(--color-slate-light)]/20 blur-3xl pointer-events-none" 
            aria-hidden="true" 
          />
          <div 
            className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#3a1f1f]/40 blur-3xl pointer-events-none" 
            aria-hidden="true" 
          />

          {/* المحتوى الرئيسي */}
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            
            {/* بادج صغير تفاعلي */}
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-xs font-extrabold text-[var(--color-slate-light)] shadow-xs backdrop-blur-md mb-5">
              <Sparkles className="h-3.5 w-3.5 text-[var(--color-slate-light)]" />
              <span>{t("ctaSection.badge", "خدمة سريعة ومضمونة")}</span>
            </span>

            {/* العنوان */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[var(--color-slate-ice)] leading-tight tracking-tight drop-shadow-md">
              {t("ctaSection.heading", "هل لديك أي استفسار أو شكوى تجارية؟")}
            </h2>
            
            {/* الوصف */}
            <p className="mt-4 text-sm sm:text-base md:text-lg text-[var(--color-slate-ice)]/80 leading-relaxed font-medium max-w-xl">
              {t("ctaSection.subheading", "فريقنا جاهز لمساعدتك ومتابعة طلبك لضمان استعادة حقوقك بأسرع وقت.")}
            </p>

            {/* الزر الرئيسي */}
            <div className="mt-8 flex justify-center w-full sm:w-auto">
              <a
                href="#complaint-form"
                onClick={onPrimaryClick}
                className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto rounded-2xl bg-[var(--color-slate-light)] px-8 py-4 text-base font-extrabold text-[var(--color-slate-dark)] shadow-[var(--shadow-glow)] transition-all duration-300 hover:bg-[var(--color-slate-ice)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <ShieldCheck className="h-5 w-5 shrink-0 transition-transform group-hover:rotate-12" />
                <span>{t("ctaSection.button", "تقديم الشكوى الآن")}</span>
                <ArrowIcon
                  className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}