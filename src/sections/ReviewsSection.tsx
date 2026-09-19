import { Star, Quote, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ReviewItem {
  id: number;
  nameKey: string;
  locationKey: string;
  commentKey: string;
  rating: number;
  dateKey: string;
  verified: boolean;
}

const REVIEWS_CONFIG: ReviewItem[] = [
  {
    id: 1,
    nameKey: "reviews.items.1.name",
    locationKey: "reviews.items.1.location",
    commentKey: "reviews.items.1.comment",
    rating: 5,
    dateKey: "reviews.items.1.date",
    verified: true,
  },
  {
    id: 2,
    nameKey: "reviews.items.2.name",
    locationKey: "reviews.items.2.location",
    commentKey: "reviews.items.2.comment",
    rating: 5,
    dateKey: "reviews.items.2.date",
    verified: true,
  },
  {
    id: 3,
    nameKey: "reviews.items.3.name",
    locationKey: "reviews.items.3.location",
    commentKey: "reviews.items.3.comment",
    rating: 5,
    dateKey: "reviews.items.3.date",
    verified: true,
  },
];

export function ReviewsSection() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n?.dir ? i18n.dir() === "rtl" : true;

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      className="py-16 md:py-24 bg-[var(--color-background)] relative overflow-hidden"
    >
      <div className="container-page">
        {/* الهيدر والعنوان */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-muted)] border border-[var(--color-border)] text-xs font-medium text-[var(--color-primary)] mb-4">
            <Star className="w-3.5 h-3.5 fill-current text-[var(--color-primary)]" />
            <span>{t("reviews.eyebrow", "تقييمات المتعاملين")}</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-foreground)] tracking-tight mb-4">
            {t("reviews.title", "آراء وتجارب المستهلكين")}
          </h2>

          <p className="text-base md:text-lg text-[var(--color-muted-foreground)] leading-relaxed">
            {t(
              "reviews.description",
              "تجارب حقيقية لمستهلكين اعتمدوا على المنصة لتوثيق وتسوية شكاويهم التجارية بكل شفافية."
            )}
          </p>
        </div>

        {/* شبكة البطاقات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {REVIEWS_CONFIG.map((review) => (
            <div
              key={review.id}
              className="bg-[var(--color-surface)] p-6 md:p-8 rounded-[var(--radius)] border border-[var(--color-border)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)] transition-all duration-300 flex flex-col justify-between relative group"
            >
              {/* أيقونة اقتباس خلفية للتزيين (ديناميكية الاتجاه) */}
              <Quote
                className={`absolute top-6 w-10 h-10 text-[var(--color-muted)] opacity-50 group-hover:text-[var(--color-primary)] group-hover:opacity-10 transition-all duration-300 pointer-events-none ${
                  isRtl ? "left-6" : "right-6 scale-x-[-1]"
                }`}
              />

              <div>
                {/* النجوم والتاريخ */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[var(--color-primary)]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-[var(--color-muted-foreground)]">
                    {t(review.dateKey)}
                  </span>
                </div>

                {/* نص التقييم */}
                <p className="text-[var(--color-foreground)] text-sm md:text-base leading-relaxed mb-6 font-normal">
                  "{t(review.commentKey)}"
                </p>
              </div>

              {/* تفاصيل المقيّم */}
              <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-[var(--color-foreground)] text-sm md:text-base">
                    {t(review.nameKey)}
                  </h3>
                  <span className="text-xs text-[var(--color-muted-foreground)]">
                    {t(review.locationKey)}
                  </span>
                </div>

                {review.verified && (
                  <div className="flex items-center gap-1 text-[var(--color-primary)] text-xs font-medium bg-[var(--color-muted)] px-2.5 py-1 rounded-md">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{t("reviews.verified", "مُوثّق")}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}