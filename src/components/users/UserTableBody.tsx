import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TableCell, TableRow } from "@mui/material";
import {
  createDisplayMessage,
  createRequestFetchAction,
  createFailedFetchAction,
  crateSuccessFetchAction,
} from "../../store/LoadingStatusReducer";
import { ROLE } from "../../constants";
import { RootStore, User } from "../../lib/types";
import { deleteUser } from "../../lib/users/deleteUser";

type Props = {
  user: User;
};

const UserTableBody: React.FC<Props> = ({ user }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector<RootStore, User>((state) => state.user);
  const currentRole = currentUser.role;

  const handleClickDelete = useCallback(
    async (
      _ev: React.MouseEvent<HTMLTableCellElement, MouseEvent>
    ): Promise<void> => {
      if (currentRole !== ROLE.MASTER) {
        dispatch(
          createDisplayMessage("ユーザー管理者のみユーザーを削除できます。")
        );
        return;
      }
      if (!window.confirm(`${user.username}さんを削除しますか？`)) {
        return;
      }
      // role: masterは消せない
      if (user.role === ROLE.MASTER) {
        dispatch(createDisplayMessage("このユーザーは削除できません。"));
        return;
      }
      if (user.uid === currentUser.uid) {
        dispatch(createDisplayMessage("このユーザーは削除できません。"));
        return;
      }

      try {
        dispatch(createRequestFetchAction());
        await deleteUser(user.uid);
        dispatch(createDisplayMessage("ユーザーが削除されました。"));

        dispatch(crateSuccessFetchAction());
      } catch (e) {
        dispatch(
          createFailedFetchAction(
            "ユーザーの削除に失敗しました。\n通信環境をご確認の上再度お試しください。"
          )
        );
      }
    },
    [dispatch, user, currentRole, currentUser.uid]
  );

  return (
    <TableRow key={user.uid}>
      <TableCell component="th" scope="row">
        {user.uid}
      </TableCell>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell
        sx={{
          cursor: "pointer",
        }}
        onClick={handleClickDelete}
      >
        削除
      </TableCell>
    </TableRow>
  );
};

export default UserTableBody;
