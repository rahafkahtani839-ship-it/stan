"use client";

import { ShieldCheck, Clock, Scale, Users, ArrowLeft, ArrowRight, Sparkles, LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

// مصفوفة الأيقونات المربوطة بالترتيب
const iconsList: LucideIcon[] = [ShieldCheck, Clock, Scale, Users];

interface WhyUsSectionProps {
  onPrimaryClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

// إعدادات أنيميشن الحاوية للكروت
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// إعدادات أنيميشن الكرت الفردي
const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function WhyUsSection({ onPrimaryClick }: WhyUsSectionProps) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n?.dir ? i18n.dir() === "rtl" : true;
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // جلب مصفوفة المميزات ديناميكياً من ملف الترجمة
  const rawItems = t("whyUs.items", { returnObjects: true });
  const itemsList = Array.isArray(rawItems) ? rawItems : [];

  return (
    <section className="relative overflow-hidden py-20 md:py-28 text-white">
      
      {/* 1. صورة الخلفية */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{ backgroundImage: "url('/fhh.jpg')" }}
        aria-hidden="true"
      >
        {/* طبقة تظليل من لون هوية الموقع الداكن مباشرة لتجنب أي انعكاس أزرق */}
        <div 
          className="absolute inset-0 backdrop-blur-[2px]" 
          style={{
            background: "linear-gradient(to right, rgba(34, 19, 19, 0.92), rgba(20, 10, 10, 0.88), rgba(34, 19, 19, 0.92))"
          }}
        />
      </div>

      {/* بقعة إضاءة من لون الهوية الفرعي/الزيتوني */}
      <div 
        className="absolute top-1/2 -right-20 w-[500px] h-[350px] bg-[var(--color-slate-light)]/20 rounded-full blur-[140px] pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="container-page relative z-10 mx-auto max-w-6xl px-4 sm:px-6 grid gap-12 lg:grid-cols-12 lg:items-center">
        
        {/* الجانب الأيسر/الأيمن: النص والعنوان والزر */}
        <motion.div 
          initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="lg:col-span-5"
        >
          {/* بادج تعريفي زجاجي بتبارز من ألوان الهوية */}
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-bold text-white shadow-xs backdrop-blur-md mb-4">
            <Sparkles className="h-3.5 w-3.5 text-[var(--color-slate-light)]" />
            <span>{t("whyUs.badge", "مميزات المنصة")}</span>
          </span>

          <h2 className="text-3xl font-black md:text-4xl lg:text-5xl leading-[1.2] text-white tracking-tight drop-shadow-sm">
            {t("whyUs.heading", "لماذا تعتبر منصتنا الخيار الأفضل لتوثيق شكواك؟")}
          </h2>

          <p className="mt-5 text-base md:text-lg text-white/90 leading-relaxed font-medium drop-shadow-xs">
            {t(
              "whyUs.subheading",
              "نوفر لك منصة متكاملة وسلسة تجمع بين السرعة والشفافية التامة في التعامل مع القضايا والشكاوى التجارية في كافة إمارات الدولة."
            )}
          </p>

          <div className="mt-8">
            <a
              href="#complaint-form"
              onClick={onPrimaryClick}
              className="group inline-flex items-center justify-center gap-3 rounded-xl bg-[var(--color-slate-light)] px-7 py-4 text-sm font-bold text-[var(--color-slate-dark)] shadow-lg transition-all duration-300 hover:bg-white hover:shadow-xl active:scale-[0.98]"
            >
              <span>{t("whyUs.submitBtn", "تقديم شكوى جديدة")}</span>
              <ArrowIcon
                className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>
        </motion.div>

        {/* الجانب الآخر: شبكة البطاقات الشفافة المتناسقة مع هوية الموقع */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-5 sm:grid-cols-2 lg:col-span-7"
        >
          {itemsList.map((item: { title: string; desc: string }, idx: number) => {
            const IconComponent = iconsList[idx] || ShieldCheck;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-[var(--color-slate-light)]/60 hover:bg-white/15"
              >
                {/* شريط علوي يضيء بلون الهوية الفرعي/الزيتوني عند التمرير */}
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-transparent via-[var(--color-slate-light)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* حاضنة الأيقونة */}
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 border border-white/20 text-white transition-all duration-300 group-hover:bg-[var(--color-slate-light)] group-hover:text-[var(--color-slate-dark)] group-hover:shadow-md">
                  <IconComponent className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" aria-hidden="true" />
                </div>

                <h3 className="mt-5 text-base font-bold text-white leading-snug">
                  {item.title}
                </h3>
                
                <p className="mt-2 text-xs leading-relaxed text-white/85 font-medium">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}