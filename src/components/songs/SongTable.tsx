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
import { RootStore } from '../../reducks/store/initialState';
import { User } from '../../reducks/users/types';
import { Song } from './types';
import { getSongs } from './getSongs';
import { deleteSong } from './deleteSong';

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

  const currentUser = useSelector<RootStore, User>(state => state.users);
  const currentRole = currentUser.role;

  const [rows, setRows] = useState<Song[]>([]);
  const [amount, setAmount] = useState(0);

  const clickDelete = useCallback((id: number, titleKana: string) => {

    // edditer only
    if (currentRole !== "editer") {
      alert("編集者のみ曲を削除できます。");
      return false;
    }

    if (window.confirm(`${titleKana}を削除しますか?`)) {
      deleteSong(id)
        .then(() => {

          // do refresh
          getSongs()
            .then((list) => {
              setRows(list);
              setAmount(list.length);
            })
        })
    } else {
      return
    }

  }, [setRows])

  useEffect(() => {
    getSongs()
      .then((list) => {
        setRows(list);
        setAmount(list.length)
      })
  }, [setRows])

  return (
    <div className="song-table">
      {!rows.length && rows.length <= amount ? (
        <h2>Loading...</h2>
      ) : (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">No.</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>タイトル(カタカナ)</TableCell>
                  <TableCell>元ネタ</TableCell>
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