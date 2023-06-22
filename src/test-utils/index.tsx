import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { MemoryRouter } from "react-router-dom";
import { ErrorModal } from "../components/ErrorModal";
import MessageModal from "../components/MessageModal";

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
    <ErrorBoundary fallbackRender={({ error }) => <ErrorModal error={error} />}>
      <QueryClientProvider client={client}>
        <>
          <MessageModal />
          {children}
        </>
      </QueryClientProvider>
    </ErrorBoundary>
  </MemoryRouter>
);
export const ReactQueryWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
