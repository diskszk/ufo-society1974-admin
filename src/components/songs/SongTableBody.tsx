import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/core/styles';
import { RootStore, Album, Song, User } from '../../lib/types';
import { TableBody, TableCell, TableRow } from '@material-ui/core/';
import { ROLE } from '../../constans';
import { updateSongsAction } from '../../store/SongsReducer';
import { deleteSong, getSongs } from '../../lib/songs';
import {
  displayMessage,
  failedFetchAction,
  requestFetchAction,
  successFetchAction,
} from '../../store/LoadingStatusReducer';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  actionBtn: {
    cursor: 'pointer',
  },
});

type SongTableBodyItemProps = {
  song: Song;
};

const SongTableBodyItem: React.FC<SongTableBodyItemProps> = ({ song }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { role } = useSelector<RootStore, User>((state) => state.user);
  const album = useSelector<RootStore, Album>((state) => state.album);
  const albumId = album.id;

  const sondId = parseInt(song.id, 10).toString();
  const audio = new Audio(song.songFile.path);

  const handlePlayMusic = () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const handleEditSong = () => {
    dispatch(push(`/albums/detail/${albumId}/edit/${song.id}`));
  };

  const handleDeleteSong = async () => {
    // edditer only
    if (role !== ROLE.EDITOR) {
      dispatch(displayMessage('編集者のみ曲を削除できます。'));
      return;
    }
    if (!window.confirm(`${song.title}を削除しますか?`)) {
      return;
    }
    try {
      dispatch(requestFetchAction());
      await deleteSong(albumId, song.id);

      // do refresh
      const songList = await getSongs(albumId);
      dispatch(updateSongsAction(songList));
      dispatch(successFetchAction());
    } catch {
      dispatch(
        failedFetchAction(
          '曲の削除に失敗しました。\n通信環境をご確認の上再度お試しください。'
        )
      );
    }
  };

  return (
    <TableRow key={song.id}>
      <TableCell align="right" component="th" scope="row">
        {sondId}
      </TableCell>
      <TableCell>{song.title}</TableCell>
      <TableCell>{song.story}</TableCell>
      <TableCell className={classes.actionBtn} onClick={handlePlayMusic}>
        {audio.paused ? <p>再生</p> : <p>停止</p>}
      </TableCell>
      <TableCell className={classes.actionBtn} onClick={() => handleEditSong()}>
        編集
      </TableCell>
      <TableCell
        className={classes.actionBtn}
        onClick={() => handleDeleteSong()}
      >
        削除
      </TableCell>
    </TableRow>
  );
};

type SongTableBodyProps = {
  songs: Song[];
};

const SongTableBody: React.FC<SongTableBodyProps> = ({ songs }) => {
  return (
    <TableBody>
      {songs.map((song) => (
        <SongTableBodyItem song={song} key={song.id} />
      ))}
    </TableBody>
  );
};

export default SongTableBody;
