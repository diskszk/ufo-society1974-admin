import React from "react";
import "./assets/styles/style.scss";
import "./reset.css";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "./store/store";

import { Header } from "./components/header";
import Routes from "./Routes";

const store = createStore();

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <main>
            <Routes />
          </main>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
