import React, { useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import SongTableBody from './SongTableBody';
import { RootStore, User, Song } from '../../lib/types';
// import {  } from '../../store/_users/types';
// import { Song } from './types';
// import {  } from './getSongs';
import { deleteSong, getSongs } from '../../lib/songs';
import { ROLE } from '../../constans';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  actionBtn: {
    cursor: "pointer"
  }
});

const SongTable = () => {
  const classes = useStyles();

  const currentUser = useSelector<RootStore, User>(state => state.user);
  const currentRole = currentUser.role;

  const [rows, setRows] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  const clickDelete = useCallback((id: number, title: string) => {

    // edditer only
    if (currentRole !== ROLE.EDITOR) {
      alert("編集者のみ曲を削除できます。");
      return false;
    }

    if (window.confirm(`${title}を削除しますか?`)) {
      deleteSong(id)
        .then(() => {

          // do refresh
          getSongs()
            .then((list) => {
              setRows(list);
            })
        })
    } else {
      return false;
    }

  }, [setRows])

  useEffect(() => {
    getSongs()
      .then((list) => {
        setRows(list);
        setLoading(false);
      })
  }, [setRows])

  return (
    <div className="song-table">
      {loading ? (
        <h2>Loading...</h2>
      ) : (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
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

              <SongTableBody
                rows={rows}
                onClick={clickDelete}
              />

            </Table>
          </TableContainer>
        )}
    </div>
  );
}

export default SongTable;