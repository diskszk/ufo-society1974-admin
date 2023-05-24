import type { Preview } from "@storybook/react";
import "../src/assets/styles/style.css";

import React from "react";
import { Provider } from "react-redux";
import { createStore } from "../src/store/store";
import { MemoryRouter } from "react-router-dom";

const store = createStore();

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
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    ),
  ],
};

export default preview;
