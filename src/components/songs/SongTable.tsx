import React, { useEffect, useMemo } from 'react';
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
import { SongAddButton } from './';
import { createUpdateSongsAction } from '../../store/SongsReducer';
import { getSongs } from '../../lib/songs';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  actionBtn: {
    cursor: 'pointer',
  },
});

export const SongTable: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { role } = useSelector<RootStore, User>((state) => state.user);
  const songs = useSelector<RootStore, Song[]>((state) => state.songs);

  const albumId = useMemo(
    () => window.location.pathname.split('/albums/detail/')[1],
    []
  );

  useEffect(() => {
    getSongs(albumId).then((dataList: Song[]) => {
      dispatch(createUpdateSongsAction(dataList));
    });
  }, []);

  return (
    <div className="song-table">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          {role === ROLE.EDITOR && <SongAddButton />}

          <TableHead>
            <TableRow>
              <TableCell align="right">No.</TableCell>
              <TableCell>タイトル</TableCell>
              <TableCell>元ネタ</TableCell>
              <TableCell>再生</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <SongTableBody songs={songs} />
        </Table>
      </TableContainer>
    </div>
  );
};
