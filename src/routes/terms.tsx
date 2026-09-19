import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { buildHead, PageHeader } from "@/components/site/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    buildHead({
      title: "الشروط والأحكام | منصة شكاوى المستهلك",
      description:
        "الشروط والأحكام الخاصة بـ منصة شكاوى المستهلك: توضيح طبيعة الخدمة المستقلة، حدود المسؤولية، وحقوق واستخدام المستهلك.",
      path: "/terms",
      breadcrumbs: [
        { name: "الرئيسية", path: "/" },
        { name: "الشروط والأحكام", path: "/terms" },
      ],
    }),
  component: TermsPage,
});

function TermsPage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n?.dir ? i18n.dir() === "rtl" : true;

  return (
    <div dir={isRtl ? "rtl" : "ltr"}>
      <PageHeader
        eyebrow={t("terms.eyebrow", "قانوني")}
        title={t("terms.title", "الشروط والأحكام")}
        description={t(
          "terms.description",
          "باستخدامك للمنصة فإنك توافق على الشروط الموضحة أدناه. يُرجى قراءتها بعناية."
        )}
      />

      <article
        className={`container-page prose prose-neutral mx-auto max-w-3xl py-14 leading-8 ${
          isRtl ? "text-right" : "text-left"
        }`}
      >
        <p className="text-sm text-muted-foreground">
          {t("terms.lastUpdated", "آخر تحديث: 14 يوليو 2026")}
        </p>

        {/* 1. طبيعة المنصة */}
        <h2 className="mt-8 text-xl font-bold">
          {t("terms.sec1Title", "1. طبيعة المنصة")}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {t(
            "terms.sec1Desc",
            "منصة شكاوى المستهلك هي منصة خاصة ومستقلة تمامًا، غير تابعة لأي جهة حكومية في دولة الإمارات ولا تمثلها بأي شكل. تعمل المنصة كوسيط لتوثيق شكاوى المستهلكين تجاه الشركات الخاصة."
          )}
        </p>

        {/* 2. مسؤولية المنصة */}
        <h2 className="mt-8 text-xl font-bold">
          {t("terms.sec2Title", "2. مسؤولية المنصة")}
        </h2>
        <ul className={`mt-3 list-disc space-y-1 text-muted-foreground ${isRtl ? "pr-5" : "pl-5"}`}>
          <li>{t("terms.sec2Item1", "توثيق الشكوى وإصدار رقم مرجعي لها.")}</li>
          <li>{t("terms.sec2Item2", "محاولة توجيه الشكوى إلى الشركة المعنية عبر قنواتها الرسمية.")}</li>
          <li>{t("terms.sec2Item3", "الحفاظ على سرية بيانات المستخدم وفقًا لسياسة الخصوصية.")}</li>
        </ul>

        {/* 3. مسؤولية المستخدم */}
        <h2 className="mt-8 text-xl font-bold">
          {t("terms.sec3Title", "3. مسؤولية المستخدم")}
        </h2>
        <ul className={`mt-3 list-disc space-y-1 text-muted-foreground ${isRtl ? "pr-5" : "pl-5"}`}>
          <li>{t("terms.sec3Item1", "تقديم معلومات صحيحة وكاملة.")}</li>
          <li>{t("terms.sec3Item2", "عدم استخدام المنصة لأي غرض غير مشروع أو مسيء.")}</li>
          <li>{t("terms.sec3Item3", "احترام حقوق الأطراف الأخرى وعدم القذف أو التشهير.")}</li>
          <li>{t("terms.sec3Item4", "الالتزام بعدم إرسال محتوى مكرر أو تلقائي.")}</li>
        </ul>

        {/* 4. حدود المسؤولية */}
        <h2 className="mt-8 text-xl font-bold">
          {t("terms.sec4Title", "4. حدود المسؤولية")}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {t(
            "terms.sec4Desc",
            "لا تضمن المنصة حل الشكوى أو الحصول على أي تعويض. لا نتحمل مسؤولية القرارات التي تتخذها الشركات المعنية، ولا تتحمل المنصة أي أضرار مباشرة أو غير مباشرة ناتجة عن الاستخدام."
          )}
        </p>

        {/* 5. المحتوى المرفوض */}
        <h2 className="mt-8 text-xl font-bold">
          {t("terms.sec5Title", "5. المحتوى المرفوض")}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {t(
            "terms.sec5Desc",
            "يحق للمنصة رفض أو حذف أي شكوى تتضمن محتوى مسيء، عنصري، تهديدي، أو مخالف للقوانين، دون الحاجة إلى إبداء الأسباب."
          )}
        </p>

        {/* 6. الاستقلالية */}
        <h2 className="mt-8 text-xl font-bold">
          {t("terms.sec6Title", "6. الاستقلالية")}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {t(
            "terms.sec6Desc",
            "نؤكد أن المنصة كيان خاص مستقل، ولا تمثل أي جهة حكومية أو قضائية أو رسمية في الإمارات، ولا تحل محلها بأي حال."
          )}
        </p>

        {/* 7. التعديلات */}
        <h2 className="mt-8 text-xl font-bold">
          {t("terms.sec7Title", "7. التعديلات")}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {t(
            "terms.sec7Desc",
            "قد نقوم بتحديث هذه الشروط في أي وقت. يُعدّ استمرارك في استخدام المنصة موافقة على الشروط بعد التعديل."
          )}
        </p>

        {/* 8. القانون المعمول به */}
        <h2 className="mt-8 text-xl font-bold">
          {t("terms.sec8Title", "8. القانون المعمول به")}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {t("terms.sec8Desc", "تخضع هذه الشروط لقوانين دولة الإمارات العربية المتحدة.")}
        </p>
      </article>
    </div>
  );
}