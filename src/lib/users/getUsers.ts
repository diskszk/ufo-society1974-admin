import { db, userRef } from '../../firebase';
import { User } from '../types';
// import { changeRoleName } from './changeRoleName';

const fetchUsers = async () => {
  const res = await userRef.where("isDelete", "!=", true).get();

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
      const dataList: (User[] | any) = userList.map((user: firebase.firestore.DocumentData) => {
        return {
          uid: user.uid,
          username: user.username,
          role: user.role,
        }
      })

      return dataList;
    }).catch((e: string) => {
      throw new Error(e);
    });
}