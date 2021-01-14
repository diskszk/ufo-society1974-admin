import React, { useEffect } from 'react';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton } from '../components/UIKit';
import { Album, RootStore, User } from '../lib/types';
import { SongTable, AlbumInfo } from '../components/songs';
import { getSingleAlbum } from '../lib/albums/getSingleAlbum';
import { createUpdateAlbumAction } from '../store/AlbumReducer';
import {
  createDisplayMessage,
  createFailedFetchAction,
  createRequestFetchAction,
  crateSuccessFetchAction,
} from '../store/LoadingStatusReducer';
import { ROLE } from '../constants';

interface Props extends RouteComponentProps<{ albumId: string }> {}

const Songs: React.FC<Props> = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const albumId = match.params.albumId;

  const album = useSelector<RootStore, Album>((state) => state.album);
  const { role } = useSelector<RootStore, User>((state) => state.user);

  let editButtonLabel: 'アルバム編集' | 'アルバム閲覧' | '' = '';

  if (role === ROLE.EDITOR) {
    editButtonLabel = 'アルバム編集';
  } else {
    editButtonLabel = 'アルバム閲覧';
  }

  useEffect(() => {
    const fetch = async () => {
      dispatch(createRequestFetchAction());

      try {
        const album = await getSingleAlbum(albumId);

        if (!album) {
          dispatch(createFailedFetchAction('アルバムが存在しません。'));
          history.push('/albums');
          return;
        } else {
          dispatch(createUpdateAlbumAction(album));
          dispatch(crateSuccessFetchAction());
        }
      } catch (e) {
        dispatch(createFailedFetchAction(e.message));
        history.push('/albums');
      }
    };

    if (albumId !== '') {
      fetch();
    } else {
      dispatch(createDisplayMessage('アルバムが登録されていません。'));
      history.push('/albums');
    }
  }, []);

  return (
    <section className="page">
      <h1>曲の管理ページ</h1>
      <div className="spacing-div"></div>

      <div className="spacing-div"></div>
      <AlbumInfo album={album} />
      <SongTable albumId={albumId} />

      <div className="button-container-row">
        <CustomButton
          label="もどる"
          onClick={(_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            history.push('/albums')
          }
        />
        <CustomButton
          label={editButtonLabel}
          onClick={(_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            history.push(`/albums/edit/${albumId}`)
          }
        />
      </div>
    </section>
  );
};

export default Songs;
