import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { createStore } from "./store/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

const client = new QueryClient();
const store = createStore();

export const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
  <MemoryRouter>
    <QueryClientProvider client={client}>
      <Provider store={store}>{children}</Provider>
    </QueryClientProvider>
  </MemoryRouter>
);
