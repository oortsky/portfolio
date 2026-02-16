import { ReactNode } from "react";
import { I18nProviderClient } from "@/locales/client";

import { SplashWrapper } from "@/components/splash-wrapper";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default async function SubLayout({
  params,
  children
}: {
  params: Promise<{ locale: string }>;
  children: ReactNode;
}) {
  const { locale } = await params;

  return (
    <I18nProviderClient locale={locale}>
      <SplashWrapper>
        <Navbar />
        {children}
        <Footer />
      </SplashWrapper>
    </I18nProviderClient>
  );
}
