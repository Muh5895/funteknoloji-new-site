import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [{ title: "Gizlilik Politikası - Fun Teknoloji" }],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  const { t } = useLang();
  return (
    <main className="pt-32 pb-20 px-4 lg:px-5 bg-[var(--fun-surface)] min-h-screen">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-16 text-center animate-in fade-in slide-in-from-top-4 duration-700">
          <span className="badge-fun badge-fun-white mb-4 inline-block shadow-sm">
            {t("legal.badge")}
          </span>
          <h1 className="text-4xl md:text-7xl font-bold fun-text mb-6 tracking-tight">
            {t("nav.privacy_policy_short")}
          </h1>
          <div className="h-1 w-20 bg-[var(--fun-purple)] mx-auto rounded-full mb-6"></div>
          <div className="bg-white/50 dark:bg-black/20 backdrop-blur-sm px-6 py-2 rounded-full w-fit mx-auto border border-[var(--fun-stroke-1)]">
            <p className="fun-text-muted text-sm font-medium">{t("policy.last_updated")}</p>
          </div>
        </div>

        <div className="grid gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
          <div
            className="rounded-[40px] p-8 md:p-12 border bg-white dark:bg-[#0D0D0D] shadow-xl shadow-black/5"
            style={{ borderColor: "var(--fun-stroke-1)" }}
          >
            <div className="prose dark:prose-invert max-w-none fun-text space-y-12">
              <section>
                <p className="text-xl leading-relaxed opacity-80">{t("policy.privacy.intro")}</p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <PolicySection title={t("policy.privacy.s1.title")} num="1">
                  {t("policy.privacy.s1.desc")}
                  <ul className="mt-4 space-y-2 opacity-70">
                    <li>• {t("policy.privacy.s1.item1")}</li>
                    <li>• {t("policy.privacy.s1.item2")}</li>
                    <li>• {t("policy.privacy.s1.item3")}</li>
                    <li>• {t("policy.privacy.s1.item4")}</li>
                  </ul>
                </PolicySection>

                <PolicySection title={t("policy.privacy.s2.title")} num="2">
                  {t("policy.privacy.s2.desc")}
                  <ul className="mt-4 space-y-2 opacity-70">
                    <li>• {t("policy.privacy.s2.item1")}</li>
                    <li>• {t("policy.privacy.s2.item2")}</li>
                    <li>• {t("policy.privacy.s2.item3")}</li>
                    <li>• {t("policy.privacy.s2.item4")}</li>
                    <li>• {t("policy.privacy.s2.item5")}</li>
                  </ul>
                </PolicySection>

                <PolicySection title={t("policy.privacy.s3.title")} num="3">
                  {t("policy.privacy.s3.desc")}
                </PolicySection>

                <PolicySection title={t("policy.privacy.s4.title")} num="4">
                  {t("policy.privacy.s4.desc")}
                </PolicySection>

                <PolicySection title={t("policy.privacy.s5.title")} num="5">
                  {t("policy.privacy.s5.desc")}
                </PolicySection>

                <PolicySection title={t("policy.privacy.s6.title")} num="6">
                  {t("policy.privacy.s6.desc")}
                </PolicySection>
              </div>

              <section className="border-t pt-10" style={{ borderColor: "var(--fun-stroke-1)" }}>
                <h2 className="text-2xl font-bold mb-4">{t("policy.contact.title")}</h2>
                <p className="opacity-70">{t("policy.privacy.contact_desc")}</p>
                <p className="mt-4 font-bold text-[var(--fun-purple)]">
                  📧 support@funteknoloji.com
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function PolicySection({
  title,
  num,
  children,
}: {
  title: string;
  num: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--fun-purple)] text-white text-sm shrink-0">
          {num}
        </span>
        {title}
      </h2>
      <div className="text-lg opacity-70 leading-relaxed">{children}</div>
    </div>
  );
}
