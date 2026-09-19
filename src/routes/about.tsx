import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Heart, CheckCircle2, XCircle, LucideIcon, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { buildHead, PageHeader } from "@/components/site/seo";
import { IndependenceNotice } from "@/components/site/IndependenceNotice";

export const Route = createFileRoute("/about")({
  head: () =>
    buildHead({
      title: "من نحن | منصة شكاوى المستهلك - توثيق شكاوى المستهلكين في الإمارات",
      description:
        "تعرّف على منصة شكاوى المستهلك - المنصة المستقلة لتوثيق شكاوى المستهلكين في الإمارات: رؤيتنا ومهمتنا وحمايتهم وتوفير مساحة آمنة لإيصال صوتهم.",
      path: "/about",
      breadcrumbs: [
        { name: "الرئيسية", path: "/" },
        { name: "من نحن", path: "/about" },
      ],
    }),
  component: AboutPage,
});

const valueIcons: LucideIcon[] = [Target, Eye, Heart];

function AboutPage() {
  const { t } = useTranslation();

  const valuesData = (t("about.values", { returnObjects: true }) as Array<{ title: string; desc: string }>) || [];
  const storyStepsData = (t("about.storySteps", { returnObjects: true }) as string[]) || [];
  const provideData = (t("about.provide", { returnObjects: true }) as string[]) || [];
  const dontProvideData = (t("about.dontProvide", { returnObjects: true }) as string[]) || [];

  return (
    <div className="bg-[var(--color-background)] min-h-screen">
      
      {/* قسم الهيدر الرئيسي مع نصوص بيضاء عالية الوضوح والتباين */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--color-slate-dark)] via-[#221313] to-[var(--color-slate-dark)] pt-28 sm:pt-32 md:pt-40 pb-16 md:pb-24 text-white shadow-xl">
        {/* شريط ضوئي سفلي */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-slate-light)] to-transparent opacity-50" />

        <div className="container-page relative z-10 mx-auto max-w-5xl px-4 sm:px-6 text-center">
          
          {/* شارة فوقية باللون الأبيض الفاتح */}
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-bold text-white shadow-xs backdrop-blur-md mb-4">
            <Sparkles className="h-3.5 w-3.5 text-[var(--color-slate-light)]" />
            <span>{t("about.eyebrow", "من نحن")}</span>
          </span>

          {/* العنوان الرئيسي باللون الأبيض الصريح */}
          <h1 className="text-3xl font-black sm:text-4xl md:text-5xl text-white tracking-tight leading-tight drop-shadow-sm">
            {t("about.title", "منصة مستقلة لخدمة المستهلك في الإمارات")}
          </h1>

          {/* النص الوصفي باللون الأبيض مع شفافية بسيطة جداً لسهولة القراءة */}
          <p className="mt-5 text-base sm:text-lg md:text-xl text-white/95 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-xs">
            {t(
              "about.description",
              "نساعد المستهلكين على توثيق شكواهم تجاه الشركات الخاصة، بأسلوب احترافي وسهل، بعيدًا عن التعقيد."
            )}
          </p>

        </div>
      </section>

      {/* تنبيه الاستقلالية */}
      <section className="container-page mx-auto max-w-5xl px-4 sm:px-6 py-10">
        <IndependenceNotice />
      </section>

      {/* قسم المهمة والرؤية والقيم */}
      <section className="container-page mx-auto max-w-6xl px-4 sm:px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          {Array.isArray(valuesData) &&
            valuesData.map((v, idx) => {
              const IconComponent = valueIcons[idx] || Target;
              return (
                <motion.article
                  key={v.title || idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xs transition-all duration-300 hover:border-[var(--color-slate-light)] hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-slate-ice)] border border-slate-100 text-[var(--color-slate-dark)] transition-colors group-hover:bg-[var(--color-slate-light)] group-hover:text-[var(--color-slate-dark)]">
                    <IconComponent className="h-6 w-6" aria-hidden />
                  </div>
                  <h2 className="mt-5 text-xl font-black text-[var(--color-slate-dark)]">
                    {v.title}
                  </h2>
                  <p className="mt-2.5 text-xs md:text-sm leading-relaxed text-[var(--color-slate-medium)] font-medium">
                    {v.desc}
                  </p>
                </motion.article>
              );
            })}
        </div>
      </section>

      {/* قسم قصتنا وكيف تراجع الشكاوى */}
      <section className="border-y border-slate-200/70 bg-white py-16 md:py-24">
        <div className="container-page mx-auto max-w-3xl px-4 sm:px-6">
          
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-slate-dark)]/5 border border-[var(--color-slate-dark)]/10 px-3.5 py-1 text-xs font-bold text-[var(--color-slate-medium)] mb-3">
            <Sparkles className="h-3.5 w-3.5 text-[var(--color-slate-medium)]" />
            <span>نبذة عن المنصة</span>
          </div>

          <h2 className="text-2xl font-black md:text-3xl text-[var(--color-slate-dark)] tracking-tight">
            {t("about.storyTitle", "قصتنا")}
          </h2>

          <p className="mt-4 text-sm md:text-base leading-relaxed text-[var(--color-slate-medium)] font-medium">
            {t(
              "about.storyP1",
              "بدأت المنصة كمبادرة خاصة يقودها فريق يؤمن بأن المستهلك يستحق قناة واضحة لتوثيق تجربته مع الشركات الخاصة. لاحظنا أن كثيرًا من الشكاوى تضيع بين رسائل البريد الإلكتروني ومكالمات مراكز الاتصال، فقررنا بناء منصة تُبقي الشكوى موثقة من لحظة تقديمها وحتى الرد عليها."
            )}
          </p>

          <p className="mt-4 text-sm md:text-base leading-relaxed text-[var(--color-slate-medium)] font-medium">
            {t(
              "about.storyP2",
              "نحن كيان خاص مستقل، ولا نمثّل أي جهة حكومية. نعمل ضمن إطار الشفافية والالتزام بحقوق المستخدم في الخصوصية وحماية البيانات."
            )}
          </p>

          <hr className="my-10 border-slate-100" />

          <h3 className="text-xl font-bold text-[var(--color-slate-dark)]">
            {t("about.howTitle", "كيف تُراجَع الشكاوى")}
          </h3>

          <ol className="mt-6 space-y-4">
            {Array.isArray(storyStepsData) &&
              storyStepsData.map((step, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-slate-dark)] text-xs font-bold text-white shadow-xs">
                    {idx + 1}
                  </span>
                  <p className="pt-0.5 text-xs md:text-sm leading-relaxed text-[var(--color-slate-medium)] font-medium">
                    {step}
                  </p>
                </li>
              ))}
          </ol>
        </div>
      </section>

      {/* قسم ما نقدمه وما لا نقدمه */}
      <section className="container-page mx-auto max-w-5xl px-4 sm:px-6 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/20 p-7 md:p-8 shadow-xs">
            <h3 className="text-xl font-bold text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <span>{t("about.provideTitle", "ما نقدّمه")}</span>
            </h3>
            <ul className="mt-6 space-y-3.5">
              {Array.isArray(provideData) &&
                provideData.map((text, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs md:text-sm leading-relaxed text-slate-700 font-medium">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>{text}</span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-rose-200/60 bg-rose-50/20 p-7 md:p-8 shadow-xs">
            <h3 className="text-xl font-bold text-rose-950 flex items-center gap-2">
              <XCircle className="h-5 w-5 text-rose-600" />
              <span>{t("about.dontProvideTitle", "ما لا نقدّمه")}</span>
            </h3>
            <ul className="mt-6 space-y-3.5">
              {Array.isArray(dontProvideData) &&
                dontProvideData.map((text, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs md:text-sm leading-relaxed text-slate-700 font-medium">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0" />
                    <span>{text}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}