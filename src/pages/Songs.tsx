import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LinkButton, PrimalyButton } from '../components/UIKit';
import SongTable from '../components/songs/SongTable';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

const Songs = () => {
  const dispatch = useDispatch();

  return (
    <section className="page">
      <h1>曲の管理ページ</h1>
      <div className="spacing-div"></div>

      <div className="button-container__right-fixed">
        <button onClick={() => dispatch(push("/songs/add"))}
        ></button>
      </div>

      <SongTable />

      <PrimalyButton
        label="もどる"
        onClick={() => dispatch(push("/"))}
      />
    </section>
  );
}

export default Songs;