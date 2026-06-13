import { createRootRoute, Outlet, HeadContent } from "@tanstack/react-router";

import { ThemeProvider } from "@/components/theme-provider";
import { NotFoundPage } from "@/components/pages/not-found";
import { ErrorPage } from "@/components/pages/error";
import { PendingPage } from "@/components/pages/pending";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { SITE, STORAGE } from "@/constants";

const queryClient = new QueryClient();

const RootLayout = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      defaultTheme={SITE.defaultTheme}
      storageKey={STORAGE.themeKey}
    >
      <main className={SITE.globalFont}>
        <TooltipProvider>
          <Navbar />
          <HeadContent />
          <Outlet />
          <Footer />
          <Toaster />
        </TooltipProvider>
      </main>
    </ThemeProvider>
  </QueryClientProvider>
);

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorPage,
  pendingComponent: PendingPage
});
