import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {
  displayMessage,
  requestFetchAction,
  failedFetchAction,
  successFetchAction,
} from '../../store/LoadingStatusReducer';
import { ROLE } from '../../constants';
import { RootStore, User } from '../../lib/types';
import { deleteUser } from '../../lib/users/deleteUser';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  actionBtn: {
    cursor: 'pointer',
  },
});

type Props = {
  user: User;
};

const UserTableBody: React.FC<Props> = ({ user }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector<RootStore, User>((state) => state.user);
  const currentRole = currentUser.role;

  const handleClickDelete = useCallback(
    async (
      _ev: React.MouseEvent<HTMLTableCellElement, MouseEvent>
    ): Promise<void> => {
      if (currentRole !== ROLE.MASTER) {
        dispatch(displayMessage('ユーザー管理者のみユーザーを削除できます。'));
        return;
      }
      if (!window.confirm(`${user.username}さんを削除しますか？`)) {
        return;
      }
      // role: masterは消せない
      if (user.role === ROLE.MASTER) {
        dispatch(displayMessage('このユーザーは削除できません。'));
        return;
      }
      if (user.uid === currentUser.uid) {
        dispatch(displayMessage('このユーザーは削除できません。'));
        return;
      }

      try {
        dispatch(requestFetchAction());
        await deleteUser(user.uid);
        dispatch(displayMessage('ユーザーが削除されました。'));

        // TODO: リストをリフレッシュする

        dispatch(successFetchAction());
      } catch (e) {
        dispatch(
          failedFetchAction(
            'ユーザーの削除に失敗しました。\n通信環境をご確認の上再度お試しください。'
          )
        );
      }
    },
    []
  );

  return (
    <TableRow key={user.uid}>
      <TableCell component="th" scope="row">
        {user.uid}
      </TableCell>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell className={classes.actionBtn} onClick={handleClickDelete}>
        削除
      </TableCell>
    </TableRow>
  );
};

export default UserTableBody;
