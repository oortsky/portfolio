import { createRootRoute, Outlet, HeadContent } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { m } from "@/paraglide/messages.js";

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
          {/* <TanStackRouterDevtools /> */}
          {/* <TanStackDevtools plugins={[formDevtoolsPlugin()]} /> */}
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
