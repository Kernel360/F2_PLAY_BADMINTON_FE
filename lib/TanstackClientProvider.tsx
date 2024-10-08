"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type React from "react";

type TanstackClientProviderProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

export function TanstackClientProvider({
  children,
}: TanstackClientProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}
