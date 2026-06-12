import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  const { lang } = useLang();
  return (
    <main className="pt-32 pb-20 px-4 lg:px-5">
      <div className="max-w-[1000px] mx-auto fun-text prose dark:prose-invert">
        {lang === "tr" ? (
          <>
            <h1>Gizlilik Politikası</h1>
            <p>Son güncelleme: 1 Ocak 2026</p>
            <p>Fun Teknoloji olarak gizliliğinize önem veriyoruz. Bu politika, hizmetlerimizi kullandığınızda bilgilerinizin nasıl toplandığını ve kullanıldığını açıklar.</p>
            <h2>1. Toplanan Veriler</h2>
            <p>Hizmetlerimizi kullandığınızda, adınız, e-posta adresiniz ve kullanım verileriniz gibi bazı bilgileri toplayabiliriz.</p>
            <h2>2. Verilerin Kullanımı</h2>
            <p>Toplanan veriler, hizmetlerimizi sağlamak, geliştirmek ve sizinle iletişim kurmak için kullanılır.</p>
          </>
        ) : (
          <>
            <h1>Privacy Policy</h1>
            <p>Last updated: January 1, 2026</p>
            <p>At Fun Teknoloji, we value your privacy. This policy explains how your information is collected and used when you use our services.</p>
            <h2>1. Data Collected</h2>
            <p>When you use our services, we may collect information such as your name, email address, and usage data.</p>
            <h2>2. Use of Data</h2>
            <p>The collected data is used to provide and improve our services and to communicate with you.</p>
          </>
        )}
      </div>
    </main>
  );
}
