"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Smartphone,
  ShoppingCart,
  Building2,
  Plane,
  CreditCard,
  Wrench,
  Truck,
  Users,
  ArrowUpLeft,
  ArrowUpRight,
  LucideIcon,
} from "lucide-react";

export interface CategoryItem {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
}

const categoryRawData: { icon: LucideIcon; key: string }[] = [
  { icon: Smartphone, key: "telecom" },
  { icon: ShoppingCart, key: "shopping" },
  { icon: Building2, key: "realEstate" },
  { icon: Plane, key: "travel" },
  { icon: CreditCard, key: "banking" },
  { icon: Wrench, key: "maintenance" },
  { icon: Truck, key: "delivery" },
  { icon: Users, key: "other" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

export function CategoriesSection() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const categories = useMemo(() => {
    return categoryRawData.map((item) => ({
      icon: item.icon,
      title: t(`categories.items.${item.key}.title`),
      desc: t(`categories.items.${item.key}.desc`),
    }));
  }, [t]);

  const ArrowIcon = isAr ? ArrowUpLeft : ArrowUpRight;

  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-[var(--color-background)]">
      {/* خلفية تزيينية بلمسة ناعمة */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[var(--color-slate-light)]/10 rounded-full blur-[140px] pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="container-page relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* العناوين والوصف */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block rounded-full bg-[var(--color-slate-light)]/15 border border-[var(--color-slate-light)]/30 px-4 py-1.5 text-xs font-bold text-[var(--color-slate-medium)] shadow-xs">
            {t("categories.badge", "التصنيفات المتاحة")}
          </span>
          
          <h2 className="mt-4 text-3xl font-black md:text-4xl text-[var(--color-slate-dark)] tracking-tight">
            {t("categories.heading")}
          </h2>
          
          <p className="mt-3 text-base text-[var(--color-slate-medium)] leading-relaxed font-medium">
            {t("categories.subheading")}
          </p>
        </motion.div>

        {/* شبكة المربعات المبتكرة بأسلوب 2 عمود للموبايل و 2 لابتوب */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-2"
        >
          {categories.map((c, idx) => (
            <motion.article
              key={idx}
              variants={cardVariants}
              whileHover={{ x: isAr ? -4 : 4, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-[var(--color-border)]/80 bg-white/80 p-5 md:p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl transition-all duration-300 hover:border-[var(--color-slate-light)] hover:bg-white hover:shadow-[var(--shadow-card)]"
            >
              {/* شريط جانبي عنابي/زيتوني يضيء عند التقريب */}
              <div 
                className={`absolute top-0 bottom-0 w-1 bg-[var(--color-slate-light)] opacity-40 transition-all duration-300 group-hover:opacity-100 group-hover:w-1.5 ${
                  isAr ? "right-0" : "left-0"
                }`} 
              />

              {/* رقم خلفي باهت يعطي لمسة معمارية وأناقة */}
              <span 
                className={`absolute text-6xl font-black text-[var(--color-slate-dark)]/5 select-none pointer-events-none transition-transform duration-300 group-hover:scale-110 ${
                  isAr ? "left-4 bottom-1" : "right-4 bottom-1"
                }`}
              >
                0{idx + 1}
              </span>

              {/* قسم المحتوى والأيقونة */}
              <div className="flex items-center gap-4.5 md:gap-5 relative z-10 min-w-0 pr-2">
                {/* صندوق الأيقونة */}
                <div className="grid h-13 w-13 shrink-0 place-items-center rounded-2xl bg-[var(--color-slate-dark)] text-[var(--color-slate-ice)] shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:bg-[var(--color-slate-light)] group-hover:text-[var(--color-slate-dark)]">
                  <c.icon className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:rotate-6" aria-hidden="true" />
                </div>

                {/* النص والوصف */}
                <div className="min-w-0">
                  <h3 className="text-base font-extrabold text-[var(--color-slate-dark)] leading-snug group-hover:text-[var(--color-slate-dark)]">
                    {c.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--color-slate-medium)] font-medium line-clamp-2">
                    {c.desc}
                  </p>
                </div>
              </div>

              {/* سهم تفاعلي على الطرف الآخر */}
              <div className="hidden sm:grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--color-slate-ice)] border border-[var(--color-border)] text-[var(--color-slate-dark)] opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:bg-[var(--color-slate-dark)] group-hover:text-white group-hover:border-transparent">
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              </div>

            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  );
}