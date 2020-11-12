import React, { useCallback, useEffect, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import BackupIcon from '@material-ui/icons/Backup';
import { makeStyles } from '@material-ui/core';
import { db, storage, } from '../../firebase';
import { SongFile } from '../../lib/types';
import { generateRandomStrings } from '../../lib/generateRandomStrings';


const useStyles = makeStyles({
  icon: {
    height: 48,
    wieth: 48,
    lineHeight: 48,
  }
});

type Props = {
  id: string;
  songFile: SongFile;
  setSongFile: React.Dispatch<React.SetStateAction<SongFile>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isUploaded: boolean;
  setIsUploaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadMusicForm = (props: Props) => {
  const classes = useStyles();

  const uploadMusic = useCallback((event: React.ChangeEvent<HTMLInputElement>, filename: string) => {
    const fileList = event.target.files;

    if (!fileList) {
      alert("ファイルが選択されていません。");
      return false;
    } else {
      props.setLoading(true);
      const file = fileList[0];

      if (filename === "") {
        // const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        // const N = 16;
        // filename = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n) => S[n % S.length]).join('');
        filename = generateRandomStrings();
      }

      const uploadRef = storage.ref('musics').child(filename);
      const uploadTask = uploadRef.put(file);

      uploadTask.then(() => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const newSongFile: SongFile = { filename: filename, path: downloadURL };
          props.setSongFile(newSongFile);
          alert("曲がのデータがアップロードされました。")
          props.setIsUploaded(true);
          props.setLoading(false);
        })
      }).catch(e => {
        alert('曲のデータのアップロードに失敗しました。');
        props.setLoading(false);
        throw new Error(e);
      })
    }
  }, [props.setSongFile]);

  const deleteMusic = useCallback(async (filename: string, id: string) => {

    const storageRef = storage.ref('musics').child(filename);
    const dbRef = db.collection('unpublished_songs').doc(id);

    if (!id) {
      alert("曲のデータがアップロードされていません。");
      return false;
    }
    if (window.confirm("この曲のデータを削除しますか？")) {
      props.setLoading(true);
      await storageRef.delete()
        .catch(e => {
          alert('曲のデータの削除に失敗しました。');
          props.setLoading(false);
          throw new Error(e);
        });
      const data = {
        music: {
          filename: "",
          path: ""
        }
      }
      await dbRef.set(data, { merge: true })
        .then(() => {
          alert('曲のデータを削除しました。');
          props.setSongFile({
            filename: "",
            path: ""
          });
          props.setIsUploaded(false)
          props.setLoading(false);
        }).catch(e => {
          alert('DBの削除に失敗しました。');
          props.setLoading(false);
          throw new Error(e);
        });
    } else {
      return false;
    }
  }, [props.songFile]);

  useEffect(() => {
    if (props.songFile.filename !== "") {
      props.setIsUploaded(true);
    }
  }, [props.songFile])

  return (
    <div className="upload-song-form">
      <p>曲をアップロード</p>
      <IconButton disabled={props.isUploaded} className={classes.icon}>
        <label htmlFor="upload-music">
          <BackupIcon />
          <input type="file" className="display-none" accept=".mp3"
            id={"upload-music"} onChange={(e) => uploadMusic(e, props.songFile.filename)} />
        </label>
      </IconButton>
      <IconButton disabled={!props.isUploaded} className={classes.icon}
        onClick={() => deleteMusic(props.songFile.filename, props.id)}>
        <DeleteOutlineIcon />
      </IconButton>
    </div>
  );
}

export default UploadMusicForm;