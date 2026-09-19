"use client";

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { HelpCircle, ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

export interface FaqItem {
  id?: string;
  question?: string;
  answer?: string;
  q?: string;
  a?: string;
}

export const faqPreview: FaqItem[] = [
  {
    id: "q1",
    question: "كيف تعمل منصة شكاوى المستهلك لتقديم الشكاوى؟",
    answer: "تتيح لك المنصة تقديم بيانات شكواك والوثائق الداعمة بسهولة. يقوم فريقنا بمراجعتها، توثيقها برقم مرجعي، ثم مخاطبة الشركة المعنية لمتابعة التوصل إلى حل إيجابي.",
  },
  {
    id: "q2",
    question: "هل خدمة تقديم الشكوى مجانية للمستهلكين في الإمارات؟",
    answer: "نعم، خدمة توثيق وتقديم ومتابعة الشكاوى مجانية بالكامل لجميع المستهلكين والمتعاملين داخل دولة الإمارات العربية المتحدة.",
  },
  {
    id: "q3",
    question: "ما الدور الذي تقوم به المنصة لحل المشكلة مع الشركة؟",
    answer: "نقوم بتوثيق الشكوى قانونياً، إصدار الرقم المرجعي، ومخاطبة إدارة المنشأة التجارية للوصول إلى تسوية عادلة تحمي حقوق المستهلك وفق الأنظمة المتبعة.",
  },
];

export function FaqSection() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n?.dir ? i18n.dir() === "rtl" : true;
  const ArrowIcon = isRtl ? ChevronLeft : ChevronRight;

  const rawItems = t("items", { returnObjects: true });
  const faqList: FaqItem[] = Array.isArray(rawItems) ? rawItems : faqPreview;

  // فتح السؤال الأول افتراضياً
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative border-t border-slate-200/80 bg-slate-50/50 py-20 md:py-28">
      <div className="container-page mx-auto max-w-6xl px-4 sm:px-6 grid gap-12 lg:grid-cols-12 items-start">
        
        {/* Side Header */}
        <div className="lg:col-span-5 lg:sticky lg:top-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-slate-dark)]/5 border border-[var(--color-slate-dark)]/10 px-4 py-1.5 text-xs font-extrabold text-[var(--color-slate-medium)]">
            <HelpCircle className="h-4 w-4 shrink-0 text-[var(--color-slate-medium)]" />
            <span>{t("badge", "الأسئلة الشائعة")}</span>
          </span>

          <h2 className="mt-4 text-3xl font-black md:text-4xl text-[var(--color-slate-dark)] leading-tight tracking-tight">
            {t("title", "استفسارات تتكرر باستمرار")}
          </h2>

          <p className="mt-4 text-base leading-relaxed text-[var(--color-slate-medium)] font-medium max-w-md">
            {t("description", "إليك إجابات لأبرز الأسئلة المتعلقة بتقديم وتوثيق الشكاوى التجارية للمستهلكين.")}
          </p>

          <div className="mt-8">
            <Link
              to="/faq"
              className="group inline-flex items-center gap-2.5 rounded-xl bg-[var(--color-slate-dark)] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:bg-[var(--color-slate-light)] hover:text-[var(--color-slate-dark)] hover:shadow-md active:scale-[0.98]"
            >
              <span>{t("view_all", "عرض جميع الأسئلة")}</span>
              <ArrowIcon
                className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-4 lg:col-span-7">
          {faqList.map((f, idx) => {
            const isOpen = openIndex === idx;
            const qText = f.question || f.q;
            const aText = f.answer || f.a;

            return (
              <motion.div
                key={f.id || idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-[var(--color-slate-light)]/80 bg-white shadow-md"
                    : "border-slate-200/80 bg-white/80 hover:border-slate-300 hover:bg-white"
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-start p-6 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base md:text-lg font-bold text-[var(--color-slate-dark)] leading-snug">
                    {qText}
                  </span>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      isOpen
                        ? "bg-[var(--color-slate-dark)] text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-slate-100 text-xs md:text-sm leading-relaxed text-[var(--color-slate-medium)] font-medium">
                        {aText}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}