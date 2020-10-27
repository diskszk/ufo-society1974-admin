import React, { useState, useEffect } from 'react';
import { PrimalyButton } from '../components/UIKit';
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined';
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
        <div
          className="icon-button" role="button"
          onClick={() => dispatch(push("/songs/edit"))}
        >
          <LibraryAddOutlinedIcon fontSize="large" />
        </div>
      </div>

      <SongTable />

      <PrimalyButton
        label="もどる"
        onClick={() => dispatch(push("/"))}
      />
    </section >
  );
}

export default Songs;