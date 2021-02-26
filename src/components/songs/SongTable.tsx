import React, { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core/';
import { SongTableBody } from './';
import { RootStore, User, Song } from '../../lib/types';
import { ROLE } from '../../constants';
import { createUpdateSongsAction } from '../../store/SongsReducer';
import {
  createDisplayMessage,
  createRequestFetchAction,
  crateSuccessFetchAction,
  createFailedFetchAction,
} from '../../store/LoadingStatusReducer';
import { getSongs } from '../../lib/songs';
import { AddIconButton } from '../UIKit';
import { checkRole } from '../../lib/helpers';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  addButton: {
    padding: 0,
  },
});

type Props = {
  albumId: string;
};

export const SongTable: React.FC<Props> = ({ albumId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { role } = useSelector<RootStore, User>((state) => state.user);
  const songs = useSelector<RootStore, Song[]>((state) => state.songs);

  const handleClickAddIcon = useCallback(
    (_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
      // 権限チェック
      const isAllowed = checkRole(ROLE.EDITOR, role);

      if (!isAllowed) {
        dispatch(
          createDisplayMessage('アカウントにアクセス権限がありません。')
        );
        return;
      }

      history.push(`/albums/detail/${albumId}/edit/new`);
    },
    [albumId, dispatch, history, role]
  );

  useEffect(() => {
    async function fetch() {
      const dataList: Song[] = await getSongs(albumId);

      dispatch(createUpdateSongsAction(dataList));
    }

    try {
      dispatch(createRequestFetchAction());
      fetch();
      dispatch(crateSuccessFetchAction());
    } catch {
      dispatch(
        createFailedFetchAction(
          '曲の取得に失敗しました。\n通信環境をご確認の上再度お試しください。'
        )
      );
    }
  }, [dispatch, albumId]);

  return (
    <div className="song-table">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">No.</TableCell>
              <TableCell>タイトル</TableCell>
              <TableCell>元ネタ</TableCell>
              <TableCell>再生</TableCell>
              <TableCell></TableCell>
              <TableCell className={classes.addButton}>
                <AddIconButton
                  allowedRole={ROLE.EDITOR}
                  currentRole={role}
                  onClick={handleClickAddIcon}
                  label="曲を追加"
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <SongTableBody songs={songs} />
        </Table>
      </TableContainer>
    </div>
  );
};
