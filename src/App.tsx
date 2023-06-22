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
import MessageModal from "./components/MessageModal";

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
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ error }) => <ErrorModal error={error} />}
            >
              <Suspense fallback={<LoadingModal />}>
                <QueryClientProvider client={client}>
                  <Provider store={store}>
                    <MessageModal />
                    <Header />
                    <main>
                      <Routes />
                    </main>
                  </Provider>
                </QueryClientProvider>
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
