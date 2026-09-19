import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Search, Send, Bell, ArrowLeft, ArrowRight, Sparkles, LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { buildHead, PageHeader } from "@/components/site/seo";

interface StepItem {
  title: string;
  desc: string;
}

export const Route = createFileRoute("/how-it-works")({
  head: () =>
    buildHead({
      title: "كيف تعمل المنصة | منصة شكاوى المستهلك",
      description:
        "تعرف على كيفية تقديم وتوثيق الشكاوى عبر منصة شكاوى المستهلك خطوة بخطوة: من تعبئة النموذج وحتى متابعة الرد واستلام الإشعارات.",
      path: "/how-it-works",
      breadcrumbs: [
        { name: "الرئيسية", path: "/" },
        { name: "كيف تعمل المنصة", path: "/how-it-works" },
      ],
    }),
  component: HowItWorksPage,
});

// قائمة الأيقونات المترابطة بالترتيب مع الخطوات
const stepIcons: LucideIcon[] = [FileText, Search, Send, Bell];

function HowItWorksPage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n?.dir ? i18n.dir() === "rtl" : true;
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // جلب خطوات العمل ديناميكياً من ملف الترجمة
  const rawSteps = t("howItWorksPage.steps", { returnObjects: true });
  const stepsList: StepItem[] = Array.isArray(rawSteps) ? rawSteps : [];

  return (
    <div className="bg-[var(--color-background)] min-h-screen">
      
      {/* 1. قسم الهيدر الداكن مع هامش علوي ممتاز لحل مشكلة التضارب كلياً */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--color-slate-dark)] via-[#221313] to-[var(--color-slate-dark)] pt-28 sm:pt-32 md:pt-40 pb-16 md:pb-24 text-white shadow-xl">
        {/* شريط ضوئي ديكوري سفلي */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-slate-light)] to-transparent opacity-50" />

        <div className="container-page relative z-10 mx-auto max-w-5xl px-4 sm:px-6 text-center">
          
          {/* الشارة الفوقية */}
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-bold text-white shadow-xs backdrop-blur-md mb-4">
            <Sparkles className="h-3.5 w-3.5 text-[var(--color-slate-light)]" />
            <span>{t("howItWorksPage.eyebrow", "آلية العمل")}</span>
          </span>

          {/* العنوان الرئيسي بالنص الأبيض الناصع */}
          <h1 className="text-3xl font-black sm:text-4xl md:text-5xl text-white tracking-tight leading-tight drop-shadow-sm">
            {t("howItWorksPage.title", "من الفكرة إلى الرد… خطوة بخطوة")}
          </h1>

          {/* الوصف الأبيض بوضوح عالي */}
          <p className="mt-5 text-base sm:text-lg md:text-xl text-white/95 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-xs">
            {t(
              "howItWorksPage.description",
              "صمّمنا العملية لتكون بسيطة وشفافة، تُبقيك على اطلاع في كل مرحلة."
            )}
          </p>

        </div>
      </section>

      {/* 2. قسم شبكة الخطوات (Step Grid) */}
      <section className="container-page mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-24">
        <ol className="grid gap-6 md:grid-cols-2">
          {stepsList.map((s, idx) => {
            const IconComponent = stepIcons[idx] || FileText;
            return (
              <motion.li
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-7 md:p-8 shadow-xs transition-all duration-300 hover:border-[var(--color-slate-light)] hover:shadow-md"
              >
                {/* رقم الخطوة الخلفي الشفاف لتزيين التصميم */}
                <span className="absolute -top-3 ltr:-right-2 rtl:-left-2 text-7xl font-black text-slate-100 select-none pointer-events-none transition-colors group-hover:text-slate-200/60">
                  0{idx + 1}
                </span>

                <div className="relative z-10 flex items-center justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-slate-ice)] border border-slate-100 text-[var(--color-slate-dark)] transition-colors group-hover:bg-[var(--color-slate-dark)] group-hover:text-white">
                    <IconComponent className="h-6 w-6" aria-hidden />
                  </div>
                  
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                    الخطوة {idx + 1}
                  </span>
                </div>

                <h2 className="relative z-10 mt-6 text-xl font-black text-[var(--color-slate-dark)]">
                  {s.title}
                </h2>
                <p className="relative z-10 mt-2.5 text-xs md:text-sm leading-relaxed text-[var(--color-slate-medium)] font-medium">
                  {s.desc}
                </p>
              </motion.li>
            );
          })}
        </ol>

        {/* 3. صندوق دعوة لاتخاذ إجراء (Call To Action) */}
        <div className="mt-16 rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-slate-100/60 p-8 text-center md:p-12 shadow-xs">
          <h2 className="text-2xl font-black md:text-3xl text-[var(--color-slate-dark)] tracking-tight">
            {t("howItWorksPage.ctaTitle", "جاهز للبدء؟")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-xs md:text-sm leading-relaxed text-[var(--color-slate-medium)] font-medium">
            {t(
              "howItWorksPage.ctaDesc",
              "قدّم شكواك الآن، وسنتولى الباقي. تقديم الشكوى مجاني عبر المنصة."
            )}
          </p>
          
          <div className="mt-8">
            <Link
              to="/"
              hash="complaint-form"
              className="inline-flex items-center gap-2.5 rounded-xl bg-[var(--color-slate-dark)] px-7 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:bg-[var(--color-slate-light)] hover:text-[var(--color-slate-dark)] hover:shadow-md active:scale-[0.98]"
            >
              <span>{t("howItWorksPage.ctaBtn", "تقديم شكوى")}</span>
              <ArrowIcon
                className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}