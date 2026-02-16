import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BarbaWrapper } from "@/components/barba-wrapper";
import { Toaster } from "@/components/ui/sonner";

const outfitSans = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap"
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "✦ OORT SPACE ✦ - Fullstack Developer",
  description:
    "Fullstack Developer portfolio by OORTSKY (Bayu Aprio Pamungkas). Explore my projects and tech—stack."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfitSans.variable} ${jetBrainsMono.variable} font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BarbaWrapper>
            <TooltipProvider>
              <QueryProvider>{children}</QueryProvider>
              <Toaster />
            </TooltipProvider>
          </BarbaWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
