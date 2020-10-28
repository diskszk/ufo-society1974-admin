import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import UserTableBody from './UserTableBody';
import { RootStore } from '../../reducks/store/initialState';
import { User as UserType } from '../../reducks/users/types';
import { User } from './types';
import { getUsers } from './getUsers';
import { deleteUser } from './deleteUser';

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
  const dispatch = useDispatch();

  const currentUser = useSelector<RootStore, UserType>(state => state.users);
  const currentRole = currentUser.role;

  const [rows, setRows] = useState<User[]>([]);
  const [amount, setAmount] = useState(0);

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
              setAmount(list.length);
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
        setAmount(list.length)
      })
  }, [setRows])

  return (
    <div className="user-table">
      {!rows.length && rows.length <= amount ? (
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