import React, { useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import UserTableBody from './UserTableBody';
import { RootStore, User } from '../../lib/types';
import { getUsers } from '../../lib/users/getUsers';
import { deleteUser } from '../../lib/users/deleteUser';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  actionBtn: {
    cursor: "pointer"
  }
});

const UserTable = () => {
  const classes = useStyles();

  const currentUser = useSelector<RootStore, User>(state => state.user);
  const currentRole = currentUser.role;

  const [rows, setRows] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const clickDelete = useCallback((id: string, username: string, role: string) => {

    // maste only
    if (currentRole !== "master") {
      alert("ユーザー管理者のみユーザーを削除できます。");
      return false;
    }

    if (window.confirm(`${username}さんを削除しますか？`)) {
      deleteUser(id, role)
        .then(() => {
          getUsers()
            .then((list) => {
              setRows(list);
            });
        })
    } else {
      return
    }
  }, [setRows]);

  useEffect(() => {
    getUsers()
      .then((list) => {
        setRows(list);
        setLoading(false);
      })
  }, [setRows])

  return (
    <div className="user-table">
      {loading ? (
        <h2>Loading...</h2>
      ) : (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ユーザーID</TableCell>
                  <TableCell>お名前</TableCell>
                  <TableCell>役職</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <UserTableBody
                rows={rows}
                onClick={clickDelete}
              />

            </Table>
          </TableContainer>
        )}
    </div>
  );
}

export default UserTable;