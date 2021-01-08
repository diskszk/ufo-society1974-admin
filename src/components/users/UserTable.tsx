import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
import { User } from '../../lib/types';
import { getUsers } from '../../lib/users/getUsers';
import {
  createRequestFetchAction,
  createFailedFetchAction,
  crateSuccessFetchAction,
} from '../../store/LoadingStatusReducer';

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
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        dispatch(createRequestFetchAction());
        const userList = await getUsers();

        console.dir(userList);
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
              <TableCell></TableCell>
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

export default withRouter(UserTable);
