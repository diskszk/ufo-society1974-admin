import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore, User } from '../lib/types';
import { deletePublishedAlbums, publishAlbums } from '../lib/albums';
import { AddIconButton, CustomButton } from '../components/UIKit';
import { AlbumTable } from '../components/albums/';
import { ROLE } from '../constants';
import { createClearAlbumAction } from '../store/AlbumReducer';
import {
  createRequestFetchAction,
  createDisplayMessage,
  createFailedFetchAction,
  crateSuccessFetchAction,
} from '../store/LoadingStatusReducer';
import { checkRole } from '../lib/helpers';

const Albums: React.FC = () => {
  const dispatch = useDispatch();

  const { role } = useSelector<RootStore, User>((state) => state.user);
  const disable: boolean = role !== ROLE.EDITOR;
  const history = useHistory();

  const handleClickPublishButton = useCallback(
    async (
      _ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): Promise<void> => {
      if (role !== ROLE.EDITOR) {
        dispatch(createDisplayMessage('編集者のみ編集内容を公開できます。'));
        return;
      }
      if (!window.confirm('編集内容を公開しますか？')) {
        return;
      }

      try {
        dispatch(createRequestFetchAction());
        await deletePublishedAlbums();
        await publishAlbums();
        dispatch(createDisplayMessage('編集内容を公開しました。'));
        dispatch(crateSuccessFetchAction());
      } catch (e) {
        dispatch(
          createFailedFetchAction(
            '公開に失敗しました。\n通信環境をご確認の上再度お試しください。'
          )
        );
      }
    },
    []
  );

  const handleClickAddIcon = useCallback(
    (_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
      const isAllowed = checkRole(ROLE.MASTER, role);

      if (!isAllowed) {
        dispatch(
          createDisplayMessage('アカウントにアクセス権限がありません。')
        );
        return;
      }

      dispatch(createClearAlbumAction());
      history.push('/albums/edit');
    },
    []
  );

  return (
    <section className="page">
      <h1>アルバムの管理ページ</h1>
      <div className="spacing-div"></div>

      <div className="spacing-div"></div>

      <div className="album-container">
        <div className="add-icon-button">
          <AddIconButton
            allowedRole={ROLE.EDITOR}
            currentRole={role}
            onClick={handleClickAddIcon}
            label="アルバムを追加"
          />
        </div>

        <AlbumTable />

        <div className="spacing-div"></div>

        <div className="button-container-row">
          <CustomButton
            label="もどる"
            onClick={(_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              history.push('/')
            }
          />
          <CustomButton
            disable={disable}
            label="公開する"
            onClick={handleClickPublishButton}
          />
        </div>
      </div>
    </section>
  );
};

export default Albums;
