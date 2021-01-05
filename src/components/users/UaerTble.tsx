import React, { useCallback, useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import UserTableBody from './UserTableBody';
import { RootStore, User } from '../../lib/types';
import { getUsers } from '../../lib/users/getUsers';
import { deleteUser } from '../../lib/users/deleteUser';
import {
  displayMessage,
  requestFetchAction,
  failedFetchAction,
  successFetchAction,
} from '../../store/LoadingStatusReducer';
import { ROLE } from '../../constants';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  actionBtn: {
    cursor: 'pointer',
  },
});

interface Props extends RouteComponentProps<{}> {}

const UserTable: React.FC<Props> = ({ history }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const currentUser = useSelector<RootStore, User>((state) => state.user);
  const currentRole = currentUser.role;

  const [rows, setRows] = useState<User[]>([]);

  const clickDelete = useCallback(
    async (id: string, username: string, role: string) => {
      // maste only
      if (currentRole !== ROLE.MASTER) {
        dispatch(displayMessage('ユーザー管理者のみユーザーを削除できます。'));
        return;
      }
      if (!window.confirm(`${username}さんを削除しますか？`)) {
        return;
      }
      // role: masterは消せない
      if (role === ROLE.MASTER) {
        dispatch(displayMessage('このユーザーは削除できません。'));
        return;
      }
      if (id === currentUser.uid) {
        dispatch(displayMessage('このユーザーは削除できません。'));
        return;
      }

      try {
        dispatch(requestFetchAction());
        await deleteUser(id);
        dispatch(displayMessage('ユーザーが削除されました。'));

        // refresh
        const userList = await getUsers();

        setRows(userList);
        dispatch(successFetchAction());
      } catch (e) {
        dispatch(
          failedFetchAction(
            'ユーザーの削除に失敗しました。\n通信環境をご確認の上再度お試しください。'
          )
        );
      }
    },
    [setRows]
  );

  useEffect(() => {
    const fetch = async () => {
      try {
        dispatch(requestFetchAction());
        const userList = await getUsers();

        setRows(userList);
        dispatch(successFetchAction());
      } catch (e) {
        dispatch(failedFetchAction(e.message));
        history.push('/');
      }
    };

    fetch();
  }, [setRows]);

  return (
    <div className="user-table">
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

          <UserTableBody rows={rows} onClick={clickDelete} />
        </Table>
      </TableContainer>
    </div>
  );
};

export default withRouter(UserTable);
