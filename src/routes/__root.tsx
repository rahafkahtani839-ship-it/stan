// ⚠️ يجب أن يظل في السطر الأول لضمان تهيئة الترجمة قبل تشغيل أي مكون
import "@/i18n";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import i18n from "@/i18n";

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "منصة الشكاوى المستقلة",
  alternateName: "UAE Complaints Platform",
  url: "/",
  description:
    "منصة خاصة ومستقلة تساعد المستهلكين في دولة الإمارات على توثيق الشكاوى تجاه الشركات الخاصة ومتابعتها. غير تابعة لأي جهة حكومية.",
  areaServed: "AE",
  inLanguage: "ar",
};

function NotFoundComponent() {
  return (
    <>
      <Header />
      <main className="container-page grid min-h-[60vh] place-items-center py-20 text-center">
        <div className="max-w-md">
          <div className="mx-auto mb-6 grid h-24 w-24 place-items-center rounded-3xl bg-accent/20 text-4xl font-bold text-primary">
            404
          </div>
          <h1 className="text-3xl font-bold text-foreground">الصفحة غير موجودة</h1>
          <p className="mt-3 text-muted-foreground">
            الرابط الذي فتحته غير صحيح أو تم نقله. يمكنك العودة إلى الصفحة الرئيسية والبدء من جديد.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-elegant"
          >
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <main className="container-page grid min-h-[60vh] place-items-center py-20 text-center">
      <div className="max-w-md">
        <h1 className="text-2xl font-bold text-foreground">حدث خطأ غير متوقع</h1>
        <p className="mt-3 text-muted-foreground">
          يمكنك المحاولة مرة أخرى أو العودة إلى الصفحة الرئيسية.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            حاول مجددًا
          </button>
          <a href="/" className="rounded-full border border-input bg-background px-5 py-2.5 text-sm font-semibold">
            الصفحة الرئيسية
          </a>
        </div>
      </div>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0f4c5c" },
      { title: "منصة الشكاوى المستقلة | توثيق شكاوى المستهلكين في الإمارات" },
      {
        name: "description",
        content:
          "منصة خاصة ومستقلة تساعد المستهلكين في دولة الإمارات على توثيق شكاواهم تجاه الشركات الخاصة بشكل بسيط وسريع. غير تابعة لأي جهة حكومية.",
      },
      { name: "author", content: "UAE Complaints Platform" },
      { property: "og:site_name", content: "منصة الشكاوى المستقلة" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ar_AE" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "منصة الشكاوى المستقلة | توثيق شكاوى المستهلكين في الإمارات" },
      { name: "twitter:title", content: "منصة الشكاوى المستقلة | توثيق شكاوى المستهلكين في الإمارات" },
      { property: "og:description", content: "منصة خاصة ومستقلة تساعد المستهلكين في دولة الإمارات على توثيق شكاواهم تجاه الشركات الخاصة بشكل بسيط وسريع. غير تابعة لأي جهة حكومية." },
      { name: "twitter:description", content: "منصة خاصة ومستقلة تساعد المستهلكين في دولة الإمارات على توثيق شكاواهم تجاه الشركات الخاصة بشكل بسيط وسريع. غير تابعة لأي جهة حكومية." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/20faf45e-3ae3-44db-b298-b400eb4e72c6" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/20faf45e-3ae3-44db-b298-b400eb4e72c6" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/The-Emirates.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&family=Tajawal:wght@500;700;800&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(ORG_JSON_LD),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const currentLang = i18n.resolvedLanguage || i18n.language || "ar";
  const dir = currentLang === "ar" ? "rtl" : "ltr";

  return (
    <html lang={currentLang} dir={dir}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:right-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
        >
          تخطي إلى المحتوى الرئيسي
        </a>
        <Header />
        <main id="main">
          <Outlet />
        </main>
        <Footer />
      </QueryClientProvider>
    </I18nextProvider>
  );
}