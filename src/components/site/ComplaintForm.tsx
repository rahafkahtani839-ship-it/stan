import { useNavigate } from "@tanstack/react-router";
import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { Loader2, Send, AlertCircle } from "lucide-react";
import { submitComplaint } from "@/lib/submit-complaint.functions";

const NAME_REGEX = /^[A-Za-z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s'\-]+$/;

function normalizePhone(v: string) {
  return v.replace(/[\s()\-]/g, "");
}

const UAE_PHONE_REGEX = /^(?:\+9715\d{8}|05\d{8})$/;

const DEVICE_ID_KEY = "myshakwa_device_id";
function getDeviceId(): string {
  try {
    let id = localStorage.getItem(DEVICE_ID_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(DEVICE_ID_KEY, id);
    }
    return id;
  } catch {
    return `nostorage-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

type RawValues = {
  fullName?: string;
  phone?: string;
  email?: string;
  status?: string;
  emirate?: string;
  category?: string;
  details?: string;
  consent?: boolean;
  website?: string;
};
type FieldKey = keyof RawValues;
type Errors = Partial<Record<FieldKey, string>>;
type Touched = Partial<Record<FieldKey, boolean>>;

export function ComplaintForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [values, setValues] = useState<RawValues>({});
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submittingRef = useRef(false);

  const statuses = useMemo(() => [
    { value: "مواطن", label: t("complaintForm.options.statuses.citizen") },
    { value: "مقيم", label: t("complaintForm.options.statuses.resident") },
  ], [t]);

  const emirates = useMemo(() => [
    { value: "أبوظبي", label: t("complaintForm.options.emirates.abudhabi") },
    { value: "دبي", label: t("complaintForm.options.emirates.dubai") },
    { value: "الشارقة", label: t("complaintForm.options.emirates.sharjah") },
    { value: "عجمان", label: t("complaintForm.options.emirates.ajman") },
    { value: "أم القيوين", label: t("complaintForm.options.emirates.ummalquwain") },
    { value: "رأس الخيمة", label: t("complaintForm.options.emirates.rasalkhaimah") },
    { value: "الفجيرة", label: t("complaintForm.options.emirates.fujairah") },
  ], [t]);

  const categories = useMemo(() => [
    { value: "شكوى تجارية", label: t("complaintForm.options.categories.commercial") },
    { value: "شكوى على شركة", label: t("complaintForm.options.categories.company") },
    { value: "شكاوى الشركات التجارية", label: t("complaintForm.options.categories.commercialCompanies") },
    { value: "الشكاوى العقارية", label: t("complaintForm.options.categories.realEstate") },
    { value: "شكاوى شكاوى المستهلك", label: t("complaintForm.options.categories.consumer") },
    { value: "شكاوى النصب والاحتيال", label: t("complaintForm.options.categories.fraud") },
    { value: "شكاوى الاحتيال المالي", label: t("complaintForm.options.categories.financialFraud") },
    { value: "شكاوى الغش التجاري", label: t("complaintForm.options.categories.commercialFraud") },
    { value: "شكاوى المتاجر الالكترونية", label: t("complaintForm.options.categories.onlineStores") },
  ], [t]);

  const schema = useMemo(() => {
    return z.object({
      fullName: z
        .string()
        .trim()
        .min(3, t("complaintForm.errors.nameMin"))
        .max(100, t("complaintForm.errors.nameMax"))
        .regex(NAME_REGEX, t("complaintForm.errors.nameRegex")),
      phone: z
        .string()
        .trim()
        .transform(normalizePhone)
        .pipe(
          z
            .string()
            .regex(UAE_PHONE_REGEX, t("complaintForm.errors.phoneInvalid"))
        ),
      email: z
        .string()
        .trim()
        .toLowerCase()
        .email(t("complaintForm.errors.emailInvalid"))
        .max(255, t("complaintForm.errors.emailMax")),
      status: z.string().min(1, t("complaintForm.errors.statusRequired")),
      emirate: z.string().min(1, t("complaintForm.errors.emirateRequired")),
      category: z.string().min(1, t("complaintForm.errors.categoryRequired")),
      details: z
        .string()
        .trim()
        .min(30, t("complaintForm.errors.detailsMin"))
        .max(2000, t("complaintForm.errors.detailsMax")),
      consent: z.literal(true, {
        errorMap: () => ({ message: t("complaintForm.errors.consentRequired") }),
      }),
      website: z.string().max(0).optional().or(z.literal("")),
    });
  }, [t]);

  const validateField = useCallback((key: FieldKey, vals: RawValues): string | undefined => {
    const payload = { ...vals, website: vals.website ?? "" };
    const res = schema.safeParse(payload);
    if (res.success) return undefined;
    const issue = res.error.issues.find((i) => i.path[0] === key);
    return issue?.message;
  }, [schema]);

  const update = useCallback(<K extends FieldKey>(key: K, v: RawValues[K]) => {
    setValues((s) => {
      const next = { ...s, [key]: v };
      setErrors((prev) => {
        if (!prev[key]) return prev;
        const err = validateField(key, next);
        if (!err) {
          const { [key]: _omit, ...rest } = prev;
          return rest;
        }
        return prev;
      });
      return next;
    });
  }, [validateField]);

  const handleBlur = useCallback(
    (key: FieldKey) => {
      setTouched((tState) => ({ ...tState, [key]: true }));
      const err = validateField(key, values);
      setErrors((prev) => {
        if (err) return { ...prev, [key]: err };
        if (!prev[key]) return prev;
        const { [key]: _omit, ...rest } = prev;
        return rest;
      });
    },
    [values, validateField]
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submittingRef.current) return;

    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "submit_complaint_click",
        form_name: "consumer_complaint_form",
      });
    }

    const parsed = schema.safeParse({ ...values, website: values.website ?? "" });
    if (!parsed.success) {
      const errs: Errors = {};
      const allTouched: Touched = {};
      for (const iss of parsed.error.issues) {
        const k = iss.path[0] as FieldKey;
        if (!errs[k]) errs[k] = iss.message;
        allTouched[k] = true;
      }
      setErrors(errs);
      setTouched((tState) => ({ ...tState, ...allTouched }));
      const firstKey = parsed.error.issues[0]?.path[0] as FieldKey | undefined;
      if (firstKey) {
        const el = formRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`);
        el?.focus();
      }
      return;
    }

    if ((values.website ?? "").length > 0) {
      navigate({ to: "/thank-you" });
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const url = new URL(window.location.href);
      await submitComplaint({
        data: {
          fullName: parsed.data.fullName,
          phone: parsed.data.phone,
          email: parsed.data.email,
          status: parsed.data.status,
          emirate: parsed.data.emirate,
          category: parsed.data.category,
          details: parsed.data.details,
          deviceId: getDeviceId(),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? "",
          userAgent: navigator.userAgent ?? "",
          language: navigator.language ?? "",
          screenSize: `${window.screen?.width ?? 0}x${window.screen?.height ?? 0}`,
          viewport: `${window.innerWidth}x${window.innerHeight}`,
          pageUrl: window.location.href,
          source: url.searchParams.get("utm_source") ?? "",
          medium: url.searchParams.get("utm_medium") ?? "",
          campaign: url.searchParams.get("utm_campaign") ?? "",
          referrer: document.referrer ?? "",
        },
      });

      if (typeof window !== "undefined" && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: "complaint_submitted",
          form_name: "consumer_complaint",
        });
      }

      navigate({ to: "/thank-you" });
    } catch (err) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("تجاوزت الحد") || msg.includes("RATE_LIMITED_24H")) {
        setSubmitError(t("complaintForm.errors.rateLimited"));
      } else {
        setSubmitError(t("complaintForm.errors.genericSubmit"));
      }
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }

  const fieldState = (key: FieldKey): "error" | "valid" | "idle" => {
    if (errors[key]) return "error";
    if (touched[key]) {
      const val = values[key];
      if (val === undefined || val === "" || val === false) return "idle";
      return validateField(key, values) ? "error" : "valid";
    }
    return "idle";
  };

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-busy={submitting}
      className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8"
    >
      <fieldset className="grid gap-4 md:grid-cols-2" disabled={submitting}>
        <legend className="col-span-full mb-1 text-base font-semibold text-foreground">
          {t("complaintForm.legend")}
        </legend>

        <Field label={t("complaintForm.labels.fullName")} name="fullName" error={errors.fullName} required>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            value={values.fullName ?? ""}
            onChange={(e) => update("fullName", e.target.value)}
            onBlur={() => handleBlur("fullName")}
            aria-invalid={fieldState("fullName") === "error" || undefined}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={inputClsFor(fieldState("fullName"))}
            required
          />
        </Field>

        <Field label={t("complaintForm.labels.phone")} name="phone" error={errors.phone} required>
          <input
            id="phone"
            name="phone"
            type="tel"
            dir="ltr"
            autoComplete="tel"
            inputMode="tel"
            placeholder={t("complaintForm.placeholders.phone")}
            value={values.phone ?? ""}
            onChange={(e) => update("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            aria-invalid={fieldState("phone") === "error" || undefined}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={inputClsFor(fieldState("phone"))}
            required
          />
        </Field>

        <Field label={t("complaintForm.labels.email")} name="email" error={errors.email} required>
          <input
            id="email"
            name="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            inputMode="email"
            value={values.email ?? ""}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            aria-invalid={fieldState("email") === "error" || undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClsFor(fieldState("email"))}
            required
          />
        </Field>

        <Field label={t("complaintForm.labels.status")} name="status" error={errors.status} required>
          <select
            id="status"
            name="status"
            value={values.status ?? ""}
            onChange={(e) => update("status", e.target.value)}
            onBlur={() => handleBlur("status")}
            aria-invalid={fieldState("status") === "error" || undefined}
            aria-describedby={errors.status ? "status-error" : undefined}
            className={inputClsFor(fieldState("status"))}
            required
          >
            <option value="">{t("complaintForm.placeholders.selectStatus")}</option>
            {statuses.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label={t("complaintForm.labels.emirate")} name="emirate" error={errors.emirate} required>
          <select
            id="emirate"
            name="emirate"
            value={values.emirate ?? ""}
            onChange={(e) => update("emirate", e.target.value)}
            onBlur={() => handleBlur("emirate")}
            aria-invalid={fieldState("emirate") === "error" || undefined}
            aria-describedby={errors.emirate ? "emirate-error" : undefined}
            className={inputClsFor(fieldState("emirate"))}
            required
          >
            <option value="">{t("complaintForm.placeholders.selectEmirate")}</option>
            {emirates.map((em) => (
              <option key={em.value} value={em.value}>
                {em.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label={t("complaintForm.labels.category")} name="category" error={errors.category} required>
          <select
            id="category"
            name="category"
            value={values.category ?? ""}
            onChange={(e) => update("category", e.target.value)}
            onBlur={() => handleBlur("category")}
            aria-invalid={fieldState("category") === "error" || undefined}
            aria-describedby={errors.category ? "category-error" : undefined}
            className={inputClsFor(fieldState("category"))}
            required
          >
            <option value="">{t("complaintForm.placeholders.selectCategory")}</option>
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>

        <div className="md:col-span-2">
          <Field label={t("complaintForm.labels.details")} name="details" error={errors.details} required>
            <textarea
              id="details"
              name="details"
              rows={5}
              maxLength={2000}
              value={values.details ?? ""}
              onChange={(e) => update("details", e.target.value)}
              onBlur={() => handleBlur("details")}
              aria-invalid={fieldState("details") === "error" || undefined}
              aria-describedby={
                errors.details ? "details-error details-count" : "details-count"
              }
              className={inputClsFor(fieldState("details")) + " resize-y"}
              placeholder={t("complaintForm.placeholders.details")}
              required
            />
            <p id="details-count" className="mt-1 text-xs text-muted-foreground">
              {(values.details?.length ?? 0)}/2000
            </p>
          </Field>
        </div>

        {/* Honeypot */}
        <div aria-hidden className="hidden">
          <label>
            Website
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={values.website ?? ""}
              onChange={(e) => update("website", e.target.value)}
            />
          </label>
        </div>

        <div className="md:col-span-2">
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              name="consent"
              className={`mt-1 h-4 w-4 rounded border-border text-primary focus:ring-accent ${
                errors.consent ? "border-red-600 ring-2 ring-red-500/20" : ""
              }`}
              checked={values.consent === true}
              onChange={(e) => update("consent", e.target.checked as true)}
              onBlur={() => handleBlur("consent")}
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              required
            />
            <span className="leading-7 text-muted-foreground">
              {t("complaintForm.consent.text1")}
              <a href="/privacy" className="text-primary font-semibold underline">
                {t("complaintForm.consent.privacy")}
              </a>
              {t("complaintForm.consent.text2")}
              <a href="/terms" className="mx-1 text-primary font-semibold underline">
                {t("complaintForm.consent.terms")}
              </a>
              {t("complaintForm.consent.text3")}
            </span>
          </label>
          {errors.consent && (
            <p
              id="consent-error"
              role="alert"
              className="mt-1.5 text-xs font-semibold text-red-600 animate-in fade-in slide-in-from-top-1 duration-200 flex items-center gap-1"
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              {errors.consent}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          {submitError && (
            <p
              role="alert"
              aria-live="polite"
              className="mb-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600 animate-in fade-in slide-in-from-top-1 duration-200 flex items-center gap-2"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              {submitError}
            </p>
          )}
          <button
            type="submit"
            disabled={submitting}
            aria-disabled={submitting}
            className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-sm transition-all duration-300 hover:bg-primary/90 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 md:text-lg"
          >
            {submitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                {t("complaintForm.buttons.submitting")}
              </>
            ) : (
              <>
                <Send className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:translate-x-1" aria-hidden />
                {t("complaintForm.buttons.submit")}
              </>
            )}
          </button>
        </div>
      </fieldset>
    </form>
  );
}

const inputBase =
  "w-full rounded-xl border bg-background px-4 py-2.5 text-sm text-foreground shadow-sm outline-none transition-colors focus:ring-2";

function inputClsFor(state: "error" | "valid" | "idle") {
  if (state === "error") {
    return `${inputBase} border-red-600 bg-red-50/20 text-red-950 focus:border-red-600 focus:ring-red-500/30`;
  }
  if (state === "valid") {
    return `${inputBase} border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/30`;
  }
  return `${inputBase} border-border focus:border-accent focus:ring-accent/30`;
}

function Field({
  label,
  name,
  error,
  required,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-foreground">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      {children}
      {error && (
        <p
          id={`${name}-error`}
          role="alert"
          aria-live="polite"
          className="mt-1.5 text-xs font-semibold text-red-600 animate-in fade-in slide-in-from-top-1 duration-200 flex items-center gap-1"
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}