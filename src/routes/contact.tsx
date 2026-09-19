import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Clock, Timer, HelpCircle, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { buildHead } from "@/components/site/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    buildHead({
      title: "تواصل معنا | منصة شكاوى المستهلك",
      description:
        "تواصل مع فريق الدعم الفني لـ منصة شكاوى المستهلك المستقلة عبر البريد الإلكتروني. نرد على استفساراتكم وملاحظاتكم خلال 24 ساعة عمل.",
      path: "/contact",
      breadcrumbs: [
        { name: "الرئيسية", path: "/" },
        { name: "تواصل معنا", path: "/contact" },
      ],
    }),
  component: ContactPage,
});

const CONTACT_EMAIL = "moetshakawi-uae@gmail.com";

function ContactPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-[var(--color-background)] min-h-screen">
      
      {/* 1. قسم الهيدر الداكن الفاخر لحل التضارب مع الهيدر الرئيسي وتوضيح النص */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--color-slate-dark)] via-[#221313] to-[var(--color-slate-dark)] pt-28 sm:pt-32 md:pt-40 pb-16 md:pb-24 text-white shadow-xl">
        {/* شريط ضوئي ديكوري سفلي */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-slate-light)] to-transparent opacity-50" />

        <div className="container-page relative z-10 mx-auto max-w-5xl px-4 sm:px-6 text-center">
          
          {/* الشارة الفوقية */}
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-bold text-white shadow-xs backdrop-blur-md mb-4">
            <Sparkles className="h-3.5 w-3.5 text-[var(--color-slate-light)]" />
            <span>{t("contact.eyebrow", "تواصل معنا")}</span>
          </span>

          {/* العنوان الرئيسي بالنص الأبيض الناصع */}
          <h1 className="text-3xl font-black sm:text-4xl md:text-5xl text-white tracking-tight leading-tight drop-shadow-sm">
            {t("contact.title", "نحن هنا للإجابة على استفساراتك")}
          </h1>

          {/* الوصف الأبيض بوضوح عالي */}
          <p className="mt-5 text-base sm:text-lg md:text-xl text-white/95 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-xs">
            {t(
              "contact.description",
              "سواء كنت بحاجة إلى مساعدة في تقديم شكوى، أو لديك سؤال عام، يسعدنا التواصل معك عبر البريد الإلكتروني."
            )}
          </p>

        </div>
      </section>

      {/* 2. قسم بطاقات معلومات التواصل */}
      <section className="container-page mx-auto max-w-5xl px-4 sm:px-6 py-16 md:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          
          <InfoCard icon={Mail} title={t("contact.emailTitle", "البريد الإلكتروني")}>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              dir="ltr"
              className="font-bold text-[var(--color-slate-dark)] hover:text-[var(--color-slate-light)] transition-colors underline underline-offset-4 decoration-[var(--color-slate-light)]"
            >
              {CONTACT_EMAIL}
            </a>
          </InfoCard>

          <InfoCard icon={Clock} title={t("contact.workingHoursTitle", "ساعات العمل")}>
            <span className="block">{t("contact.workingDays", "من الأحد إلى الخميس")}</span>
            <span className="block mt-1 font-semibold text-[var(--color-slate-dark)]">
              {t("contact.workingTime", "9:00 صباحًا – 6:00 مساءً (بتوقيت الإمارات)")}
            </span>
          </InfoCard>

          <InfoCard icon={Timer} title={t("contact.responseTimeTitle", "زمن الرد المتوقع")}>
            {t("contact.responseTimeDesc", "خلال 24 ساعة عمل من استلام الرسالة.")}
          </InfoCard>

          <InfoCard icon={HelpCircle} title={t("contact.faqTitle", "الأسئلة الشائعة")}>
            {t("contact.faqText", "هل سؤالك عام؟ تفقد ")}{" "}
            <Link
              to="/faq"
              className="font-bold text-[var(--color-slate-dark)] hover:text-[var(--color-slate-light)] transition-colors underline underline-offset-4 decoration-[var(--color-slate-light)]"
            >
              {t("contact.faqLink", "صفحة الأسئلة الشائعة")}
            </Link>
            .
          </InfoCard>

        </div>
      </section>

    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Mail;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all duration-300 hover:border-[var(--color-slate-light)] hover:shadow-md"
    >
      <div className="flex items-center gap-3.5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-slate-ice)] border border-slate-100 text-[var(--color-slate-dark)] transition-colors group-hover:bg-[var(--color-slate-dark)] group-hover:text-white">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <h2 className="text-lg font-black text-[var(--color-slate-dark)]">{title}</h2>
      </div>
      <div className="mt-4 text-xs md:text-sm leading-relaxed text-[var(--color-slate-medium)] font-medium">
        {children}
      </div>
    </motion.div>
  );
}