import React from 'react';
import './assets/styles/style.css';
import Header from './components/header/Header';
import Routes from './Routes';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Routes />
      </main>
    </>
  );
};

export default App;
