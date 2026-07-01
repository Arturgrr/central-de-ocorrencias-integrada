import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
  beforeLoad: async () => {
    // ---------------------------------------------------------
    // CÃO DE GUARDA DESATIVADO PARA PROTOTIPAÇÃO DO FRONTEND
    // ---------------------------------------------------------
    
    // const session = await authClient.getSession();
    // if (!session.data) {
    //   throw redirect({
    //     to: "/login",
    //   });
    // }
    // return { session };

    // Retornamos uma "sessão fantasma" para enganar o sistema
    return { session: { data: { user: { role: 'operador' } } } };
  },
});

function AuthLayout() {
  return <Outlet />;
}