"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FileCheck2, ShieldCheck, Clock, Lock } from "lucide-react";
import { ComplaintForm } from "@/components/site/ComplaintForm";

export function ComplaintFormSection() {
  const { t } = useTranslation();

  const trustBadges = [
    {
      icon: ShieldCheck,
      textKey: t("complaintFormSection.trust1", "حماية كاملة للبيانات"),
    },
    {
      icon: Clock,
      textKey: t("complaintFormSection.trust2", "متابعة سريعة خلال 24 ساعة"),
    },
    {
      icon: Lock,
      textKey: t("complaintFormSection.trust3", "مشفر وآمن 100%"),
    },
  ];

  return (
    <section 
      aria-label={t("complaintFormSection.ariaLabel")}
      className="relative overflow-hidden bg-[var(--color-background)] py-20 md:py-32"
    >
      {/* خلفية جمالية: بقع إضاءة زيتونية وداكنة للمسة عمق ممتازة */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[var(--color-slate-light)]/15 rounded-full blur-[160px] pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-[var(--color-slate-dark)]/5 rounded-full blur-[120px] pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="container-page relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        
        {/* العناوين والبادج العلوي */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-slate-dark)] text-[var(--color-slate-ice)] px-4 py-1.5 text-xs font-extrabold shadow-md border border-white/10">
            <FileCheck2 className="h-4 w-4 text-[var(--color-slate-light)]" aria-hidden="true" />
            <span>{t("complaintFormSection.badge")}</span>
          </span>

          <h2 className="mt-5 text-3xl font-black sm:text-4xl md:text-5xl text-[var(--color-slate-dark)] tracking-tight leading-tight">
            {t("complaintFormSection.heading")}
          </h2>

          <p className="mt-4 text-base md:text-lg text-[var(--color-slate-medium)] leading-relaxed font-medium">
            {t("complaintFormSection.subheading")}
          </p>
        </motion.div>

        {/* شريط مؤشرات الثقة (Trust Indicators) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 md:gap-10 text-xs sm:text-sm font-bold text-[var(--color-slate-dark)]/80"
        >
          {trustBadges.map((badge, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-white/60 border border-[var(--color-border)]/80 px-3.5 py-1.5 rounded-full shadow-2xs backdrop-blur-md">
              <badge.icon className="h-4 w-4 text-[var(--color-slate-medium)] shrink-0" />
              <span>{badge.textKey}</span>
            </div>
          ))}
        </motion.div>

        {/* غلاف النموذج الفاخر في المنتصف */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          id="complaint-form" 
          aria-label={t("complaintFormSection.formAriaLabel")}
          data-webmcp-tool="complaint_submission"
          className="relative mx-auto mt-12 max-w-4xl scroll-mt-24 min-h-[500px]"
        >
          {/* إطار مضيء وتأثير زجاجي ينبض بالأناقة حول الفورم */}
          <div className="relative rounded-3xl border border-[var(--color-border)] bg-white/80 p-6 sm:p-10 md:p-12 shadow-[var(--shadow-card)] backdrop-blur-2xl">
            
            {/* شريط عنابي/زيتوني علوي تزييني */}
            <div className="absolute inset-x-0 top-0 h-1.5 rounded-t-3xl bg-gradient-to-r from-[var(--color-slate-dark)] via-[var(--color-slate-light)] to-[var(--color-slate-dark)]" />

            {/* النموذج الداخلي */}
            <ComplaintForm />
          </div>
        </motion.div>

      </div>
    </section>
  );
}