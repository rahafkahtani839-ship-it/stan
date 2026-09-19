"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, SearchCheck, Send, CheckCircle2, ChevronRight, ChevronLeft, LucideIcon } from "lucide-react";

export interface StepItem {
  n: string;
  title: string;
  desc: string;
}

const stepIcons: LucideIcon[] = [FileText, SearchCheck, Send, CheckCircle2];

export function HowItWorksSection() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n?.dir ? i18n.dir() === "rtl" : true;

  const rawSteps = t("howItWorks.steps", { returnObjects: true });
  const stepsList: StepItem[] = Array.isArray(rawSteps) ? rawSteps : [
    { n: "01", title: "تعبئة البيانات", desc: "أدخل تفاصيل الشكوى والمستندات الداعمة بسهولة عبر النموذج." },
    { n: "02", title: "مراجعة الطلب", desc: "يقوم فريقنا المختص بفحص الطلب والتأكد من اكتمال الشروط." },
    { n: "03", title: "المتابعة والتحويل", desc: "إرسال الشكوى للجهة المعنية ومتابعة الإجراءات أولاً بأول." },
    { n: "04", title: "إغلاق الشكوى", desc: "إشعارك بالنتيجة النهائية وحل الشكوى بسرعة وشفافية." },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // التقليب التلقائي كل 3.5 ثوانٍ عند عدم التفاعل
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stepsList.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, stepsList.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % stepsList.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + stepsList.length) % stepsList.length);
  };

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-slate-50/60 py-20 md:py-28 border-y border-[var(--color-border)]/60"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container-page relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        
        {/* الهيدر والعناوين */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-[var(--color-slate-dark)]/5 border border-[var(--color-slate-dark)]/10 px-4 py-1.5 text-xs font-extrabold text-[var(--color-slate-medium)]">
            {t("howItWorks.badge", "خطوات عمل بسيطة")}
          </span>

          <h2 className="mt-4 text-3xl font-black md:text-4xl text-[var(--color-slate-dark)] tracking-tight">
            {t("howItWorks.heading", "آلية توثيق ومتابعة الشكاوى")}
          </h2>

          <p className="mt-3 text-base text-[var(--color-slate-medium)] font-medium leading-relaxed">
            {t("howItWorks.subheading", "آلية عمل شفافة تضمن متابعة حقك برقم مرجعي رسمي.")}
          </p>
        </div>

        {/* عارض الخطوات بالتمركز والتركيز على الكرت الأوسط */}
        <div className="relative mt-14 flex flex-col items-center">
          
          <div className="relative flex items-center justify-center w-full min-h-[280px] md:min-h-[300px]">
            {stepsList.map((step, idx) => {
              const StepIcon = stepIcons[idx] || FileText;
              
              // حساب الإزاحة ومستوى التركيز بناءً على العنصر النشط
              let offset = idx - activeIndex;
              if (offset < -1) offset += stepsList.length;
              if (offset > 1) offset -= stepsList.length;

              const isCenter = idx === activeIndex;

              return (
                <motion.div
                  key={step.n}
                  onClick={() => setActiveIndex(idx)}
                  initial={false}
                  animate={{
                    x: `${offset * 105}%`,
                    scale: isCenter ? 1 : 0.85,
                    opacity: isCenter ? 1 : 0.45,
                    zIndex: isCenter ? 20 : 10,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 25 }}
                  className={`absolute w-[88%] sm:w-[380px] md:w-[420px] cursor-pointer rounded-3xl border p-7 sm:p-8 backdrop-blur-xl transition-colors ${
                    isCenter
                      ? "border-[var(--color-slate-light)] bg-white shadow-xl shadow-[var(--color-slate-dark)]/5"
                      : "border-slate-200/80 bg-white/70 shadow-xs hover:opacity-75"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${
                      isCenter ? "bg-[var(--color-slate-dark)] text-white" : "bg-slate-100 text-slate-600"
                    }`}>
                      <StepIcon className="h-6 w-6" />
                    </div>

                    <span className={`font-mono text-3xl font-black ${
                      isCenter ? "text-[var(--color-slate-light)]" : "text-slate-300"
                    }`}>
                      {step.n}
                    </span>
                  </div>

                  <h3 className={`mt-6 text-lg sm:text-xl font-bold transition-colors ${
                    isCenter ? "text-[var(--color-slate-dark)]" : "text-slate-700"
                  }`}>
                    {step.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[var(--color-slate-medium)] font-medium">
                    {step.desc}
                  </p>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400">
                    <span>الخطوة {step.n} من {stepsList.length}</span>
                    {isCenter && (
                      <span className="inline-flex items-center gap-1.5 text-[var(--color-slate-dark)] font-bold">
                        <span className="h-2 w-2 rounded-full bg-[var(--color-slate-light)] animate-ping" />
                        الخطوة الحالية
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* أزرار التحكم والتقليب */}
          <div className="mt-10 flex items-center gap-6">
            <button
              onClick={isRtl ? handleNext : handlePrev}
              aria-label="الخطوة السابقة"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs transition-all hover:bg-slate-100 active:scale-95"
            >
              <ChevronRight className="h-5 w-5 rtl:rotate-180" />
            </button>

            {/* نقاط المؤشر السفلية (Indicators) */}
            <div className="flex items-center gap-2">
              {stepsList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex
                      ? "w-8 bg-[var(--color-slate-dark)]"
                      : "w-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`الانتقال للخطوة ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={isRtl ? handlePrev : handleNext}
              aria-label="الخطوة التالية"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs transition-all hover:bg-slate-100 active:scale-95"
            >
              <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}