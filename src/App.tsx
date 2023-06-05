import React, { Suspense } from "react";
import "./assets/styles/style.scss";
import "./reset.css";

import { BrowserRouter } from "react-router-dom";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { createStore } from "./store/store";

import LoadingModal from "./components/LoadingModal";
import { ErrorModal } from "./components/ErrorModal";

import { Header } from "./components/header";
import Routes from "./Routes";

const store = createStore();
const client = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Suspense fallback={<LoadingModal />}>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                onReset={reset}
                fallbackRender={({ error }) => <ErrorModal error={error} />}
              >
                <QueryClientProvider client={client}>
                  <Provider store={store}>
                    <Header />
                    <main>
                      <Routes />
                    </main>
                  </Provider>
                </QueryClientProvider>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </Suspense>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
