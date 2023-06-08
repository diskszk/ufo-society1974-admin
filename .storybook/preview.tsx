import type { Preview } from "@storybook/react";
import "../src/assets/styles/style.css";

import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { createStore } from "../src/store/store";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const store = createStore();
const client = new QueryClient();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ErrorBoundary fallback={<p>Something Error</p>}>
        <Provider store={store}>
          <MemoryRouter>
            <QueryClientProvider client={client}>
              <Story />
            </QueryClientProvider>
          </MemoryRouter>
        </Provider>
      </ErrorBoundary>
    ),
  ],
};

export default preview;
