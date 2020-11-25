import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import BackupIcon from '@material-ui/icons/Backup';
import { makeStyles } from '@material-ui/core';
import { File, RootStore } from '../../lib/types';
import { generateRandomStrings } from '../../lib/generateRandomStrings';
import {
  clearSongFileAction,
  updateSongFileAction,
} from '../../store/SongFileReducer';
import { deleteSongFile, uploadSongFile } from '../../lib/songs';

const useStyles = makeStyles({
  icon: {
    height: 48,
    wieth: 48,
    lineHeight: 48,
  },
});

type Props = {
  albumId: string;
  songId: string;
};

const SongUploadForm: React.FC<Props> = ({ albumId, songId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { filename } = useSelector<RootStore, File>((state) => state.songFile);

  const handleChangeUploadSongButton = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const fileList = event.target.files;

    if (!fileList) {
      alert('ファイルが選択されていません。');
      return;
    } else {
      const file = fileList[0];
      const newFileName = generateRandomStrings();

      console.log(1);

      const newSongFile = await uploadSongFile(file, newFileName);
      console.log(3);

      dispatch(updateSongFileAction(newSongFile));
      console.log(4);
      alert('曲がのデータがアップロードされました。');
    }
  };

  const handleDeleteSongFileButton = async () => {
    if (filename === '') {
      alert('曲のデータがアップロードされていません。');
      return;
    }
    if (window.confirm('この曲のデータを削除しますか？')) {
      await deleteSongFile(filename, albumId, songId);
      dispatch(clearSongFileAction());
    } else {
      return;
    }
  };

  return (
    <div className="upload-song-form">
      <p>曲をアップロード</p>
      {filename === '' ? (
        // add song file
        <IconButton className={classes.icon}>
          <label htmlFor="upload-music">
            <BackupIcon />
            <input
              type="file"
              className="display-none"
              accept=".mp3"
              id={'upload-music'}
              onChange={(e) => handleChangeUploadSongButton(e)}
            />
          </label>
        </IconButton>
      ) : (
        // delete song file
        <IconButton
          className={classes.icon}
          onClick={() => handleDeleteSongFileButton()}
        >
          <DeleteOutlineIcon />
        </IconButton>
      )}
    </div>
  );
};

export default SongUploadForm;
