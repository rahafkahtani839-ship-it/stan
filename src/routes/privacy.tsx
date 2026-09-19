import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { buildHead, PageHeader } from "@/components/site/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    buildHead({
      title: "سياسة الخصوصية | منصة شكاوى المستهلك",
      description:
        "تعرّف على سياسة الخصوصية وحماية البيانات في منصة شكاوى المستهلك: آلية جمع واستخدام وحماية بيانات المستخدمين وحقوق الخصوصية الخاصة بك.",
      path: "/privacy",
      breadcrumbs: [
        { name: "الرئيسية", path: "/" },
        { name: "سياسة الخصوصية", path: "/privacy" },
      ],
    }) as any,
  component: PrivacyPage,
});

const CONTACT_EMAIL = "moetshakawi-uae@gmail.com";

function PrivacyPage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n?.dir ? i18n.dir() === "rtl" : true;

  return (
    <div dir={isRtl ? "rtl" : "ltr"}>
      <PageHeader
        eyebrow={t("privacy.eyebrow", "قانوني")}
        title={t("privacy.title", "سياسة الخصوصية")}
        description={t(
          "privacy.description",
          "نلتزم بحماية خصوصيتك. يوضح هذا المستند نوع البيانات التي نجمعها وكيف نستخدمها."
        )}
      />
      
      <article
        className={`container-page prose prose-neutral mx-auto max-w-3xl py-14 leading-8 ${
          isRtl ? "text-right" : "text-left"
        }`}
      >
        <p className="text-sm text-muted-foreground">
          {t("privacy.lastUpdated", "آخر تحديث: 14 يوليو 2026")}
        </p>

        {/* 1. المعلومات التي نجمعها */}
        <h2 className="mt-8 text-xl font-bold">
          {t("privacy.sec1Title", "1. المعلومات التي نجمعها")}
        </h2>
        <ul className={`mt-3 list-disc space-y-1 text-muted-foreground ${isRtl ? "pr-5" : "pl-5"}`}>
          <li>{t("privacy.sec1Item1", "بيانات التعريف: الاسم، البريد الإلكتروني، رقم الهاتف، الإمارة.")}</li>
          <li>{t("privacy.sec1Item2", "محتوى الشكوى: اسم الشركة والتفاصيل التي تدخلها في النموذج.")}</li>
          <li>{t("privacy.sec1Item3", "بيانات تقنية: عنوان IP، نوع المتصفح، وقت الزيارة (لأغراض الأمان).")}</li>
        </ul>

        {/* 2. الغرض من جمع البيانات */}
        <h2 className="mt-8 text-xl font-bold">
          {t("privacy.sec2Title", "2. الغرض من جمع البيانات")}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {t(
            "privacy.sec2Desc",
            "نستخدم بياناتك لتوثيق شكواك وتوجيهها إلى الشركة المعنية، والتواصل معك بشأن حالتها، ولتحسين خدمات المنصة."
          )}
        </p>

        {/* 3. التخزين والاحتفاظ */}
        <h2 className="mt-8 text-xl font-bold">
          {t("privacy.sec3Title", "3. التخزين والاحتفاظ")}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {t(
            "privacy.sec3Desc",
            "تُخزَّن البيانات في خوادم آمنة، ونحتفظ بها للمدة اللازمة لإتمام معالجة الشكوى ولمدة إضافية معقولة لأغراض قانونية أو تشغيلية، بحد أقصى 24 شهرًا."
          )}
        </p>

        {/* 4. ملفات تعريف الارتباط */}
        <h2 className="mt-8 text-xl font-bold">
          {t("privacy.sec4Title", "4. ملفات تعريف الارتباط (Cookies)")}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {t(
            "privacy.sec4Desc",
            "نستخدم ملفات تعريف الارتباط الضرورية لتشغيل الموقع، وقد نستخدم ملفات تحليلية لفهم طريقة استخدام الموقع وتحسين تجربتك."
          )}
        </p>

        {/* 5. مشاركة البيانات */}
        <h2 className="mt-8 text-xl font-bold">
          {t("privacy.sec5Title", "5. مشاركة البيانات")}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {t(
            "privacy.sec5Desc",
            "لا نبيع بياناتك. نُشارك تفاصيل الشكوى فقط مع الشركة المعنية بها ومع مزودي الخدمة التقنيين الذين يخضعون لالتزامات سرية."
          )}
        </p>

        {/* 6. الأمان */}
        <h2 className="mt-8 text-xl font-bold">
          {t("privacy.sec6Title", "6. الأمان")}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {t(
            "privacy.sec6Desc",
            "نطبّق إجراءات تقنية وتنظيمية لحماية بياناتك، بما في ذلك التشفير عند النقل ومراجعات الوصول الدورية."
          )}
        </p>

        {/* 7. حقوقك */}
        <h2 className="mt-8 text-xl font-bold">
          {t("privacy.sec7Title", "7. حقوقك")}
        </h2>
        <ul className={`mt-3 list-disc space-y-1 text-muted-foreground ${isRtl ? "pr-5" : "pl-5"}`}>
          <li>{t("privacy.sec7Item1", "حق الوصول إلى بياناتك.")}</li>
          <li>{t("privacy.sec7Item2", "حق تصحيحها أو تحديثها.")}</li>
          <li>{t("privacy.sec7Item3", "حق طلب حذفها وفقًا للسياسات المعمول بها.")}</li>
          <li>{t("privacy.sec7Item4", "حق سحب الموافقة على المعالجة.")}</li>
        </ul>
        <p className="mt-3 text-muted-foreground">
          {t("privacy.sec7ContactPrefix", "لممارسة أي من هذه الحقوق راسلنا على")}{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline dir-ltr inline-block" dir="ltr">
            {CONTACT_EMAIL}
          </a>
          .
        </p>

        {/* 8. تحديث السياسة */}
        <h2 className="mt-8 text-xl font-bold">
          {t("privacy.sec8Title", "8. تحديث السياسة")}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {t(
            "privacy.sec8Desc",
            "قد نقوم بتحديث هذه السياسة من وقت لآخر. سنقوم بنشر أي تحديثات على هذه الصفحة مع تاريخ آخر مراجعة."
          )}
        </p>
      </article>
    </div>
  );
}