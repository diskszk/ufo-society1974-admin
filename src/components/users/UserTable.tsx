import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
} from "@mui/material";
import UserTableBody from "./UserTableBody";
import { RootStore, User } from "../../lib/types";
import { getUsers } from "../../lib/users/getUsers";
import {
  createRequestFetchAction,
  createFailedFetchAction,
  crateSuccessFetchAction,
  createDisplayMessage,
} from "../../store/LoadingStatusReducer";
import { AddIconButton } from "../UIKit";
import { ROLE } from "../../constants";
import { checkRole } from "../../lib/helpers";
import { db } from "../../firebase";

type PresentationProps = {
  role: string;
  handleClickAddIcon: (
    _ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  users: User[];
};

export const Presentation: React.FC<PresentationProps> = ({
  role,
  handleClickAddIcon,
  users,
}) => {
  return (
    <div className="user-table">
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 650,
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>ユーザーID</TableCell>
              <TableCell>お名前</TableCell>
              <TableCell>役職</TableCell>
              <TableCell>
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

const UserTable: React.FC = () => {
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
          createDisplayMessage("アカウントにアクセス権限がありません。")
        );
        return;
      }
      // TODO: 外に出す
      history.push("/users/create");
    },
    [dispatch, history, role]
  );

  useEffect(() => {
    const fetch = async () => {
      try {
        dispatch(createRequestFetchAction());
        const userList = await getUsers();

        setUsers(userList);
        dispatch(crateSuccessFetchAction());
      } catch (e) {
        // dispatch(createFailedFetchAction(e.message));
        dispatch(createFailedFetchAction("error message"));
        history.push("/");
      }
    };

    fetch();
  }, [setUsers, dispatch, history]);

  useEffect(() => {
    const unSub = db.collection("users").onSnapshot((snapshot) => {
      const userList = snapshot.docs.map((doc) => {
        const data = doc.data();
        const user: User = {
          isSignedIn: data.isSignedIn,
          uid: data.uid,
          username: data.username,
          role: data.role,
        };

        return user;
      });

      setUsers(userList);

      return () => unSub();
    });
  }, []);

  useEffect(() => {
    const unSub = db.collection("users").onSnapshot((snapshot) => {
      const userList = snapshot.docs.map((doc) => {
        const data = doc.data();
        const user: User = {
          isSignedIn: data.isSignedIn,
          uid: data.uid,
          username: data.username,
          role: data.role,
        };

        return user;
      });

      setUsers(userList);

      return () => unSub();
    });
  }, []);

  return (
    <Presentation
      role={role}
      handleClickAddIcon={handleClickAddIcon}
      users={users}
    />
  );
};

export default UserTable;
