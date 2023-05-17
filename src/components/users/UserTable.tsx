import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
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
  const navigate = useNavigate();
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
      navigate("/users/create");
    },
    [dispatch, navigate, role]
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
        navigate("/");
      }
    };

    fetch();
  }, [setUsers, dispatch, navigate]);

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
