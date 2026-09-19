import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Clock3,
  Mail,
  ShieldCheck,
  Home,
  Sparkles,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { buildHead } from "@/components/site/seo";

export const Route = createFileRoute("/thank-you")({
  head: () =>
    buildHead({
      title: "تم استلام شكواك بنجاح | منصة شكاوى المستهلك",
      description:
        "شكرًا لتقديم شكواك عبر منصة شكاوى المستهلك. تم استلام الطلب وبدأت عملية المراجعة.",
      path: "/thank-you",
    }),
  component: ThankYouPage,
});

function ThankYouPage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n?.dir ? i18n.dir() === "rtl" : true;

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      className="relative min-h-screen overflow-hidden bg-[var(--color-slate-dark)] text-white pt-28 pb-12 md:pt-36 md:pb-20 flex items-center justify-center"
    >
      {/* الخلفية مع طبقة تظليل داكنة فاخرة */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src="/hhhh.jpg"
          alt="خلفية منصة شكاوى المستهلك"
          className="h-full w-full object-cover object-center scale-105 opacity-15"
        />
        {/* طبقة تظليل داكنة تحافظ على هؤية الموقع */}
        <div 
          className="absolute inset-0 backdrop-blur-[3px]" 
          style={{
            background: "linear-gradient(to bottom, rgba(34, 19, 19, 0.95), rgba(20, 10, 10, 0.92), rgba(34, 19, 19, 0.95))"
          }}
        />
        {/* تأثيرات الإضاءة الجانبية */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--color-slate-light)]/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[var(--color-slate-light)]/10 rounded-full blur-3xl animate-float-slower" />
      </div>

      <div className="container-page relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full text-center"
        >
          {/* أيقونة النجاح */}
          <div className="mb-6 sm:mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 scale-150 rounded-full bg-[var(--color-slate-light)]/30 blur-2xl animate-pulse" />
              <div className="relative grid h-20 w-20 sm:h-24 sm:w-24 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl">
                <div className="grid h-14 w-14 sm:h-16 sm:w-16 place-items-center rounded-full bg-[var(--color-slate-light)] text-[var(--color-slate-dark)] shadow-md">
                  <Check className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={3} />
                </div>
              </div>
            </div>
          </div>

          {/* محتوى الشكر والعناوين */}
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs sm:text-sm font-bold text-white shadow-xs">
              <Sparkles className="h-4 w-4 text-[var(--color-slate-light)]" />
              <span>{t("thankYou.badge", "تم تسجيل الطلب بنجاح")}</span>
              <CheckCircle2 className="h-4 w-4 text-[var(--color-slate-light)]" />
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-sm">
              {t("thankYou.heading", "شكواك وصلت إلينا بنجاح")}
            </h1>

            <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed text-white/85 font-medium">
              {t("thankYou.subheadingP1", "شكرًا لثقتك بـ")}{" "}
              <span className="font-black text-white bg-white/15 px-2.5 py-0.5 rounded-lg border border-white/20 backdrop-blur-sm">
                {t("thankYou.platformName", "منصة شكاوى المستهلك")}
              </span>
              . {t("thankYou.subheadingP2", "تم استلام بيانات شكواك وتحويلها إلى القسم المختص لبدء عملية المراجعة.")}
            </p>
          </div>

          {/* بطاقة متابعة حالة الطلب الشفافة والحديثة */}
          <div
            className={`mt-8 sm:mt-12 overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-white/10 backdrop-blur-md shadow-2xl ${
              isRtl ? "text-right" : "text-left"
            }`}
          >
            {/* الهيدر الخاص بالبطاقة */}
            <div className="border-b border-white/10 bg-white/5 px-6 py-4 sm:px-8 sm:py-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-white/70">
                  {t("thankYou.statusLabel", "حالة الشكوى الحالية")}
                </p>
                <p className="mt-1 text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-slate-light)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-slate-light)]"></span>
                  </span>
                  {t("thankYou.statusValue", "قيد المراجعة والتدقيق")}
                </p>
              </div>

              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-[var(--color-slate-light)]">
                <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
              </div>
            </div>

            {/* مراحل الشكوى (Timeline) */}
            <div className="p-6 sm:p-8">
              <div className="grid gap-6 md:grid-cols-3 relative">
                {/* الخطوة 1: المكتملة */}
                <div className="relative flex flex-col items-start gap-3">
                  <div className="flex items-center gap-3 w-full">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--color-slate-light)] text-[var(--color-slate-dark)] font-bold shadow-md">
                      <Check className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm sm:text-base">
                        {t("thankYou.step1Title", "استلام الشكوى")}
                      </p>
                      <p className="text-xs text-white/70 font-medium">
                        {t("thankYou.step1Desc", "تم حفظ بياناتك بنجاح")}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`hidden md:block absolute top-5 h-[2px] bg-white/20 -z-0 ${
                      isRtl ? "right-12 left-0" : "left-12 right-0"
                    }`}
                  />
                </div>

                {/* الخطوة 2: الحالية */}
                <div className="relative flex flex-col items-start gap-3">
                  <div className="flex items-center gap-3 w-full">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--color-slate-light)] bg-[var(--color-slate-light)]/20 text-[var(--color-slate-light)] shadow-md animate-pulse">
                      <Clock3 className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-bold text-[var(--color-slate-light)] text-sm sm:text-base">
                        {t("thankYou.step2Title", "المراجعة الأولية")}
                      </p>
                      <p className="text-xs text-white/70 font-medium">
                        {t("thankYou.step2Desc", "جاري التحقق من التفاصيل")}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`hidden md:block absolute top-5 h-[2px] bg-white/20 -z-0 ${
                      isRtl ? "right-12 left-0" : "left-12 right-0"
                    }`}
                  />
                </div>

                {/* الخطوة 3: القادمة */}
                <div className="relative flex flex-col items-start gap-3">
                  <div className="flex items-center gap-3 w-full">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 bg-white/5 text-white/40">
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-bold text-white/50 text-sm sm:text-base">
                        {t("thankYou.step3Title", "إشعار بالنتيجة")}
                      </p>
                      <p className="text-xs text-white/40 font-medium">
                        {t("thankYou.step3Desc", "التحديثات عبر البريد")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* صندوق التنبيه والإرشادات الزجاجي */}
          <div
            className={`mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md px-5 py-4 ${
              isRtl ? "text-right" : "text-left"
            }`}
          >
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-slate-light)]" aria-hidden="true" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-white">
                  {t("thankYou.emailAlertTitle", "تفقد بريدك الإلكتروني")}
                </p>
                <p className="mt-0.5 text-xs text-white/75 font-medium">
                  {t("thankYou.emailAlertDesc", "تم إرسال تأكيد الاستلام والرقم المرجعي الخاص بشكواك إلى إيميلك.")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs font-bold text-white bg-white/10 border border-white/15 px-3 py-1.5 rounded-xl shrink-0 shadow-xs">
              <Clock3 className="h-3.5 w-3.5 text-[var(--color-slate-light)]" aria-hidden="true" />
              {t("thankYou.processingTime", "المعالجة خلال 24 ساعة")}
            </div>
          </div>

          {/* أزرار الإجراءات والتحويل */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/"
              className="relative group inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-2xl bg-[var(--color-slate-light)] px-8 py-4 text-base font-bold text-[var(--color-slate-dark)] shadow-xl transition-all duration-300 hover:bg-white hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
            >
              <Home className="h-5 w-5 relative z-10" />
              <span className="relative z-10">{t("thankYou.backHome", "العودة للصفحة الرئيسية")}</span>
              <ArrowLeft
                className={`h-4 w-4 relative z-10 transition-transform duration-300 ${
                  isRtl ? "group-hover:-translate-x-1.5" : "rotate-180 group-hover:translate-x-1.5"
                }`}
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* شريط الطمأنة الأمني */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs font-bold text-white/80">
            <ShieldCheck className="h-4 w-4 text-[var(--color-slate-light)]" aria-hidden="true" />
            <span>{t("thankYou.securityNote", "معلوماتك مشفرة ومحمية بأعلى معايير السرية والأمان")}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}