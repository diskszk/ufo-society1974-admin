import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import SongTableBody from './SongTableBody';
import { RootStore, User, Song } from '../../lib/types';
import { deleteSong, getSongs } from '../../lib/songs';
import { ROLE } from '../../constans';
import SongAddButton from './SongAddButton';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  actionBtn: {
    cursor: 'pointer',
  },
});

const SongTable = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { role } = useSelector<RootStore, User>((state) => state.user);
  const [rows, setRows] = useState<Song[]>([]);

  const albumId = useMemo(
    () => window.location.pathname.split('/albums/detail/')[1],
    []
  );

  // const clickDelete = useCallback(
  //   (id: number, title: string) => {
  //     // edditer only
  //     if (role !== ROLE.EDITOR) {
  //       alert('編集者のみ曲を削除できます。');
  //       return false;
  //     }

  //     if (window.confirm(`${title}を削除しますか?`)) {
  //       deleteSong(id).then(() => {
  //         // do refresh
  //         getSongs().then((list) => {
  //           setRows(list);
  //         });
  //       });
  //     } else {
  //       return false;
  //     }
  //   },
  //   [setRows]
  // );

  useEffect(() => {
    getSongs(albumId).then((dataList: Song[]) => {
      setRows(dataList);
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
          <SongTableBody rows={rows} />
        </Table>
      </TableContainer>
    </div>
  );
};

export default SongTable;
