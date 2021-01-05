import React from 'react';
import { useSelector } from 'react-redux';
import './assets/styles/style.scss';
import Header from './components/header/Header';
import Routes from './Routes';
import { RootStore, LoadingStatus } from './lib/types';

import LoadingModal from './components/LoadingModal';
import MessageModal from './components/MessageModal';

const App = () => {
  const { isLoading, message } = useSelector<RootStore, LoadingStatus>(
    (state) => state.loadingStatus
  );

  return (
    <>
      {isLoading && <LoadingModal />}
      {message && <MessageModal message={message} />}
      <Header />
      <main>
        <Routes />
      </main>
    </>
  );
};

export default App;
