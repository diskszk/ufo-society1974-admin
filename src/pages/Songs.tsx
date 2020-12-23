import React, { useEffect, useMemo } from 'react';
import { PrimalyButton } from '../components/UIKit';
import SongTable from '../components/songs/SongTable';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { Album, RootStore } from '../lib/types';
import AlbumInfo from '../components/songs/AlbumInfo';
import { getSingleAlbum } from '../lib/albums/getSingleAlbum';
import { updateAlbumAction } from '../store/AlbumReducer';
import {
  displayMessage,
  failedFetchAction,
  requestFetchAction,
  successFetchAction,
} from '../store/LoadingStatusReducer';

const Songs: React.FC = () => {
  const dispatch = useDispatch();

  const albumId = useMemo(
    () => window.location.pathname.split(`albums/detail`)[1].split('/')[1],
    []
  );

  const album = useSelector<RootStore, Album>((state) => state.album);

  useEffect(() => {
    const fetch = async () => {
      dispatch(requestFetchAction());

      try {
        const album = await getSingleAlbum(albumId);
        if (!album) {
          dispatch(failedFetchAction('アルバムが存在しません。'));
          dispatch(push('/albums'));
          return;
        } else {
          dispatch(updateAlbumAction(album));
        }
        dispatch(successFetchAction());
      } catch (e) {
        dispatch(failedFetchAction(e.message));
      }
    };

    if (albumId !== '') {
      fetch();
    } else {
      dispatch(displayMessage('アルバムが登録されていません。'));
      dispatch(push('/albums'));
    }
  }, []);

  return (
    <section className="page">
      <h1>曲の管理ページ</h1>
      <div className="spacing-div"></div>

      <div className="spacing-div"></div>
      <AlbumInfo album={album} />
      <SongTable />

      <div className="button-container-row">
        <PrimalyButton
          label="もどる"
          onClick={() => dispatch(push('/albums'))}
        />
        <PrimalyButton
          label="アルバム編集"
          onClick={() => dispatch(push(`/albums/edit/${albumId}`))}
        />
      </div>
    </section>
  );
};

export default Songs;
