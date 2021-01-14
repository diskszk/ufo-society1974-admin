import React, { useCallback, useState, useEffect } from 'react';
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
  TableBody,
} from '@material-ui/core';
import UserTableBody from './UserTableBody';
import { RootStore, User } from '../../lib/types';
import { getUsers } from '../../lib/users/getUsers';
import {
  createRequestFetchAction,
  createFailedFetchAction,
  crateSuccessFetchAction,
  createDisplayMessage,
} from '../../store/LoadingStatusReducer';
import { AddIconButton } from '../UIKit';
import { ROLE } from '../../constants';
import { checkRole } from '../../lib/helpers';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  addButton: {
    padding: 0,
  },
});

const UserTable: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [users, setUsers] = useState<User[]>([]);
  const history = useHistory();
  const { role } = useSelector<RootStore, User>((state) => state.user);

  const handleClickAddIcon = useCallback(
    (_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
      //権限チェック
      const isAllowed = checkRole(ROLE.MASTER, role);

      if (!isAllowed) {
        dispatch(
          createDisplayMessage('アカウントにアクセス権限がありません。')
        );
        return;
      }
      history.push('/users/create');
    },
    []
  );

  useEffect(() => {
    const fetch = async () => {
      try {
        dispatch(createRequestFetchAction());
        const userList = await getUsers();

        setUsers(userList);
        dispatch(crateSuccessFetchAction());
      } catch (e) {
        dispatch(createFailedFetchAction(e.message));
        history.push('/');
      }
    };

    fetch();
  }, [setUsers]);

  return (
    <div className="user-table">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ユーザーID</TableCell>
              <TableCell>お名前</TableCell>
              <TableCell>役職</TableCell>
              <TableCell className="">
                <AddIconButton
                  allowedRole={ROLE.MASTER}
                  currentRole={role}
                  onClick={handleClickAddIcon}
                  label="アカウント作成"
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, key) => {
              return <UserTableBody user={user} key={key} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserTable;
