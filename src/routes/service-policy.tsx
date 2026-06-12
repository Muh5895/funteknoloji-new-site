import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";

export const Route = createFileRoute("/service-policy")({
  component: ServicePolicy,
});

function ServicePolicy() {
  const { lang } = useLang();
  return (
    <main className="pt-32 pb-20 px-4 lg:px-5">
      <div className="max-w-[1000px] mx-auto fun-text prose dark:prose-invert">
        {lang === "tr" ? (
          <>
            <h1>Hizmet Politikası</h1>
            <p>Son güncelleme: 1 Ocak 2026</p>
            <p>Fun Teknoloji hizmetlerini kullanarak aşağıdaki şartları kabul etmiş sayılırsınız.</p>
            <h2>1. Hizmet Kullanımı</h2>
            <p>Hizmetlerimizi yalnızca yasal amaçlarla ve bu politikaya uygun olarak kullanmayı kabul edersiniz.</p>
            <h2>2. Sorumluluk Sınırı</h2>
            <p>Fun Teknoloji, hizmetlerin kullanımından kaynaklanan doğrudan veya dolaylı zararlardan sorumlu tutulamaz.</p>
          </>
        ) : (
          <>
            <h1>Service Policy</h1>
            <p>Last updated: January 1, 2026</p>
            <p>By using Fun Teknoloji services, you agree to the following terms.</p>
            <h2>1. Service Use</h2>
            <p>You agree to use our services only for lawful purposes and in accordance with this policy.</p>
            <h2>2. Limitation of Liability</h2>
            <p>Fun Teknoloji cannot be held liable for any direct or indirect damages arising from the use of the services.</p>
          </>
        )}
      </div>
    </main>
  );
}
