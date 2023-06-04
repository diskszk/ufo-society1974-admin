import React, { Suspense } from "react";
import "./assets/styles/style.scss";
import "./reset.css";

import { BrowserRouter } from "react-router-dom";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Provider } from "react-redux";
import { createStore } from "./store/store";

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
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
              <div>
                There was an error!
                <button onClick={() => resetErrorBoundary()}>Try again</button>
              </div>
            )}
          >
            <BrowserRouter>
              <QueryClientProvider client={client}>
                <Suspense fallback={<div>Loading...</div>}>
                  <Provider store={store}>
                    <Header />
                    <main>
                      <Routes />
                    </main>
                  </Provider>
                </Suspense>
              </QueryClientProvider>
            </BrowserRouter>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </React.StrictMode>
  );
};

export default App;
