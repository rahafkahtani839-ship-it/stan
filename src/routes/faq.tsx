import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { HelpCircle, Sparkles } from "lucide-react";
import { buildHead, PageHeader } from "@/components/site/seo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  q: string;
  a: string;
}

export const Route = createFileRoute("/faq")({
  head: () =>
    buildHead({
      title: "الأسئلة الشائعة | منصة شكاوى المستهلك",
      description:
        "إجابات مفصلة وشاملة عن أكثر الأسئلة شيوعًا حول منصة شكاوى المستهلك: كيفية تقديم الشكاوى، شروط الخدمة، والخصوصية.",
      path: "/faq",
      breadcrumbs: [
        { name: "الرئيسية", path: "/" },
        { name: "الأسئلة الشائعة", path: "/faq" },
      ],
    }),
  component: FaqPage,
});

function FaqPage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n?.dir ? i18n.dir() === "rtl" : true;

  // جلب مصفوفة الأسئلة من ملف الترجمة
  const faqsData = (t("faq.items", { returnObjects: true }) as FaqItem[]) || [];
  const faqsList: FaqItem[] = Array.isArray(faqsData) ? faqsData : [];

  return (
    <div className="bg-[var(--color-background)] min-h-screen">
      
      {/* 1. قسم الهيدر الداكن الفاخر لحل مشكلة التضارب مع الهيدر الرئيسي */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--color-slate-dark)] via-[#221313] to-[var(--color-slate-dark)] pt-28 sm:pt-32 md:pt-40 pb-16 md:pb-24 text-white shadow-xl">
        {/* شريط ضوئي ديكوري سفلي */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-slate-light)] to-transparent opacity-50" />

        <div className="container-page relative z-10 mx-auto max-w-5xl px-4 sm:px-6 text-center">
          
          {/* الشارة الفوقية */}
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-bold text-white shadow-xs backdrop-blur-md mb-4">
            <Sparkles className="h-3.5 w-3.5 text-[var(--color-slate-light)]" />
            <span>{t("faq.eyebrow", "الأسئلة الشائعة")}</span>
          </span>

          {/* العنوان الرئيسي بالنص الأبيض الصريح */}
          <h1 className="text-3xl font-black sm:text-4xl md:text-5xl text-white tracking-tight leading-tight drop-shadow-sm">
            {t("faq.title", "إجابات لأكثر أسئلتكم شيوعًا")}
          </h1>

          {/* الوصف الأبيض بوضوح عالي */}
          <p className="mt-5 text-base sm:text-lg md:text-xl text-white/95 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-xs">
            {t(
              "faq.description",
              "جمعنا لكم أهم التساؤلات التي تصلنا حول عمل المنصة والخدمات التي نقدمها."
            )}
          </p>

        </div>
      </section>

      {/* 2. قسم بطاقات الأسئلة والأجوبة */}
      <section className="container-page mx-auto max-w-4xl px-4 sm:px-6 py-16 md:py-24">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 md:p-10 shadow-xs">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqsList.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-xl border border-slate-100 bg-slate-50/50 px-5 py-2 transition-all duration-200 data-[state=open]:border-slate-200 data-[state=open]:bg-white data-[state=open]:shadow-xs"
              >
                <AccordionTrigger
                  className={`py-4 text-base md:text-lg font-bold text-[var(--color-slate-dark)] hover:no-underline transition-colors ${
                    isRtl ? "text-right" : "text-left"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-slate-ice)] text-xs font-black text-[var(--color-slate-dark)]">
                      <HelpCircle className="h-4 w-4 text-[var(--color-slate-medium)]" />
                    </span>
                    <span>{f.q}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-1 text-xs md:text-sm leading-relaxed text-[var(--color-slate-medium)] font-medium border-t border-slate-100/80 mt-2">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

    </div>
  );
}