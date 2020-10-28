import { db } from '../../firebase';
import { User } from './types';
import { changeRoleName } from './changeRoleName';

const fetchUsers = async () => {
  const res = await db.collection("users").where("isDelete", "!=", true).get();

  if (res.empty) return [];
  const userList: firebase.firestore.DocumentData[] = [];

  res.forEach((doc) => {
    userList.push(doc.data());
  })

  return userList;
}

export const getUsers = async () => {
  return await fetchUsers()
    .then(userList => {
      const dataList: User[] = userList.map((user: firebase.firestore.DocumentData) => {
        const roleName = changeRoleName(user.role);
        return {
          uid: user.uid,
          username: user.username,
          role: user.role,
          roleName: roleName
        }
      })

      return dataList;
    }).catch((e: string) => {
      throw new Error(e);
    });
}