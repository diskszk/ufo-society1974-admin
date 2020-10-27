import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../reducks/users/operation';
import { fetchUsers } from './fetchUsers';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { RootStore } from '../../reducks/store/initialState';
import { User as UserType } from '../../reducks/users/types';


export type User = {
  uid: string;
  username: string;
  role: string;
  roleName: string;
}

const UserTable = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector<RootStore, UserType>(state => state.users);
  const currentRole = currentUser.role;
  const [users, setUsers] = useState<User[]>([]);

  const clickDelete = useCallback((id: string, username: string) => {

    // maste only
    if (currentRole !== "master") {
      alert("ユーザー管理者のみユーザーを削除できます。");
      return false;
    }

    if (window.confirm(`${username}さんを削除しますか？`)) {
      dispatch(deleteUser(id));
      fetchUsers()
        .then(userList => {
          const datas: User[] = userList.map((user: firebase.firestore.DocumentData) => {
            const roleName = changeRoleName(user.role);
            return {
              uid: user.uid,
              username: user.username,
              role: user.role,
              roleName: roleName
            }
          })
          console.log(datas);

          setUsers(datas);
        }).catch((e: string) => {
          throw new Error(e);
        });
    } else {
      return
    }
  }, [setUsers]);

  const changeRoleName = (role: string) => {
    switch (role) {
      case "master":
        return "ユーザー管理者"
      case "editer":
        return "編集者";
      case "test":
        return "テスト";
      default:
        return "?????";
    }
  }

  useEffect(() => {
    fetchUsers()
      .then(userList => {
        const datas: User[] = userList.map((user: firebase.firestore.DocumentData) => {
          const roleName = changeRoleName(user.role);
          return {
            uid: user.uid,
            username: user.username,
            role: user.role,
            roleName: roleName
          }
        })
        console.log(datas);

        setUsers(datas);
      }).catch((e: string) => {
        throw new Error(e);
      });

  }, [setUsers]);

  return (
    <div className="user-table">
      <ul>
        <li className="user-element">
          <p className="username">お名前</p>
          <p className="role">権限</p>
          <div className="delete"></div>
        </li>
        {users.map((user: User, key: number) => {
          return (
            <li className="user-element" key={key}>
              <p className="username">{user.username}</p>
              <p className="role">{user.roleName}</p>

              <div
                className="delete icon-button"
                onClick={() => clickDelete(user.uid, user.username)}
              >
                <DeleteOutlineIcon />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default UserTable;