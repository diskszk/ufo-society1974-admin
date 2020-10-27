import { db } from '../../firebase';

export const fetchUsers = async () => {
  const res = await db.collection("users").where("isDelete", "!=", true).get();

  if (res.empty) return [];
  const userList: firebase.firestore.DocumentData[] = [];

  res.forEach((doc) => {
    userList.push(doc.data());
  })

  return userList;
}