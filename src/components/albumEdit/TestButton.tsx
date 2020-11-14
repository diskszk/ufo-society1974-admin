import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { db } from '../../firebase';


const testAlbumsRef = db.collection('testAlbums');

const TestButton = () => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const saveTestData = () => {
    return async (dispatch: any) => {
      console.log('aa');

      setLoad(true);
      const albumData = {
        title: 'good songs OST',
        discription: '30曲入り',
        image: {
          fiename: "",
          path: "",
        },
        publish_date: '2019-03-30',
        songs: [{
          id: '1',
          title: 'kite'
        }, {
          id: '2',
          title: 'young'
        }]
      };

      await testAlbumsRef.doc('good_songs_OST').set(albumData, { merge: true }).catch(() => {
        throw new Error;
      }).then(() => {
        alert('登録完了');
        setLoad(false)
      })

    }
  }

  const handleUpdate = () => {
    console.log('uploading');

    dispatch(saveTestData());
  }

  const readTestData = () => {
    return async (dispatch: any) => {
      const res = await testAlbumsRef.doc('good_songs_OST').get()
      if (!res) return [];
      // console.log(res);
      const data = res.data();
      console.log(data);
      if (!data) return false;
      data.songs.map((song: any) => {
        console.log(song.title);
      })

    }

  }
  const handleRead = () => {
    console.log('read song2');
    dispatch(readTestData());
  }



  return (
    <>
      <button onClick={handleUpdate} >upload</button>
      <button onClick={handleRead} >read</button>
      {load && (
        <p>Loading...</p>
      )}
    </>
  )
}

export default TestButton;