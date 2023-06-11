import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: false,
      suspense: true,
    },
  },
});

export const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
  <MemoryRouter>
    <QueryClientProvider client={client}>
      <>{children}</>
    </QueryClientProvider>
  </MemoryRouter>
);
