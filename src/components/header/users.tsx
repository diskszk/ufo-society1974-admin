import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';

const Users = () => {

  const [users, setUsers] = useState<firebase.firestore.DocumentData>([]);

  useEffect(() => {
    const searchUsers = async () => {
      const res = await db.collection('users').get();
      if (res.empty) return [];
      const userList: firebase.firestore.DocumentData[] = [];
      res.forEach(doc => {
        userList.push(doc.data());
      })

      setUsers(userList);
    }

    searchUsers();
  }, [])
  return (
    <ul>
      {users.map((user: any, key: number) => {
        return (
          <li>
            <p>{user.username}</p>
          </li>
        )
      })}
    </ul>
  );
}

export default Users;