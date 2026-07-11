import { Toaster } from "@eng-soft1/ui/components/sonner";
import { HeadContent, Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

// Removemos a importação do Header daqui!
import { ThemeProvider } from "@/components/theme-provider";

import "../index.css";

export interface RouterAppContext {}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
  head: () => ({
    meta: [
      {
        // Já deixei o título com a cara do projeto real!
        title: "COI - Defesa Civil", 
      },
      {
        name: "description",
        content: "Central de Ocorrências Integrada",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
  }),
});

function RootComponent() {
  return (
    <>
      <HeadContent />
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
        storageKey="vite-ui-theme"
      >
        {/* Removemos o Grid restritivo e o Header. Agora o Outlet domina 100% do espaço */}
        <main className="min-h-screen w-full bg-slate-900">
          <Outlet />
        </main>
        
        <Toaster richColors />
      </ThemeProvider>
      <TanStackRouterDevtools position="bottom-left" />
    </>
  );
}
