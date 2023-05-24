import type { Preview } from "@storybook/react";
import "../src/assets/styles/style.css";

import { Provider } from "react-redux";
import { createStore } from "../src/store/store";
import React from "react";

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
        <Story />
      </Provider>
    ),
  ],
};

export default preview;
