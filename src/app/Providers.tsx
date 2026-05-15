import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/reactQuery";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};
