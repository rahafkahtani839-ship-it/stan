import { createFileRoute } from "@tanstack/react-router";
import { useCallback, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { buildHead } from "@/components/site/seo";
// تحميل الأقسام الرئيسة مبكراً لسرعة الـ LCP
import { HeroSection } from "@/sections/HeroSection";
import { ComplaintFormSection } from "@/sections/ComplaintFormSection";
import { faqPreview, type FaqItem } from "@/sections/FaqSection";

// Lazy Loading للأقسام الثانوية
const CategoriesSection = lazy(() =>
  import("@/sections/CategoriesSection").then((m) => ({ default: m.CategoriesSection }))
);
const HowItWorksSection = lazy(() =>
  import("@/sections/HowItWorksSection").then((m) => ({ default: m.HowItWorksSection }))
);
const WhyUsSection = lazy(() =>
  import("@/sections/WhyUsSection").then((m) => ({ default: m.WhyUsSection }))
);
const ReviewsSection = lazy(() =>
  import("@/sections/ReviewsSection").then((m) => ({ default: m.ReviewsSection }))
);
const FaqSection = lazy(() =>
  import("@/sections/FaqSection").then((m) => ({ default: m.FaqSection }))
);
const CtaSection = lazy(() =>
  import("@/sections/CtaSection").then((m) => ({ default: m.CtaSection }))
);

/* ==========================================================================
   TanStack Router Route Definition (Home Page - /)
   ========================================================================== */
export const Route = createFileRoute("/")({
  head: () => {
    return buildHead({
      title: "منصة شكاوى المستهلك | تقديم وتوثيق شكاوى المستهلك ضد الشركات الخاصة",
      description:
        "هل واجهت مشكلة تجارية؟ قدّم شكواك ورسالتك الآن عبر منصة شكاوى المستهلك لتوثيق ومتابعة شكاوى المستهلكين ضد المنشآت والشركات الخاصة في الإمارات بسهولة وشفافية.",
      path: "/",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "منصة شكاوى المستهلك",
          alternateName: "المنصة الرقمية الموحدة لتوثيق الشكاوى التجارية بالإمارات",
          inLanguage: "ar",
          url: "https://emirates-support.com/",
        },
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "منصة شكاوى المستهلك",
          url: "https://emirates-support.com/",
          logo: "https://emirates-support.com/logo.png",
          image: "https://emirates-support.com/logo.png",
          address: {
            "@type": "PostalAddress",
            addressCountry: "AE",
            addressRegion: "Dubai / Abu Dhabi",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "1420",
            bestRating: "5",
            worstRating: "1",
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "Service",
          name: "تقديم وتوثيق الشكاوى التجارية",
          serviceType: "توثيق وتسوية شكاوى المستهلكين",
          provider: {
            "@type": "Organization",
            name: "منصة شكاوى المستهلك الإمارات",
            url: "https://www.emirates-report.com",
          },
          areaServed: {
            "@type": "Country",
            name: "United Arab Emirates",
          },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "خدمات شكاوى المستهلك والحلول التجارية",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "تقديم وتوثيق الشكاوى التجارية",
                },
              },
            ],
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: (faqPreview || []).map((item: FaqItem) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        },
      ],
    });
  },
  component: HomePage,
});

/* ==========================================================================
   Main HomePage Component
   ========================================================================== */
function HomePage() {
  const { i18n } = useTranslation();
  const isRtl = i18n?.dir ? i18n.dir() === "rtl" : true;

  const scrollToForm = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    requestAnimationFrame(() => {
      const el = document.getElementById("complaint-form");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });

        const firstInput = el.querySelector<HTMLElement>(
          "input:not([type='hidden']), select, textarea"
        );
        if (firstInput) {
          setTimeout(() => firstInput.focus({ preventScroll: true }), 350);
        }
      }
    });
  }, []);

  return (
    <div dir={isRtl ? "rtl" : "ltr"}>
      {/* الأقسام الهامة فوراً لتحقيق أقصى سرعة LCP */}
      <HeroSection onPrimaryClick={scrollToForm} />
      <ComplaintFormSection />

      {/* الأقسام الثانوية عبر Suspense */}
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <CategoriesSection />
        <HowItWorksSection />
        <WhyUsSection onPrimaryClick={scrollToForm} />
       
        <FaqSection />
        <CtaSection onPrimaryClick={scrollToForm} />
      </Suspense>
    </div>
  );
}