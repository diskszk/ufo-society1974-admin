import React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { RootStore, Album, Song, User } from '../../lib/types';
import { TableCell, TableRow } from '@material-ui/core/';
import { ROLE } from '../../constants';
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

interface Props extends RouteComponentProps<{}> {
  song: Song;
}

const SongTableBodyItem: React.FC<Props> = ({ song, history }) => {
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
      <TableCell
        className={classes.actionBtn}
        onClick={() =>
          history.push(`/albums/detail/${albumId}/edit/${song.id}`)
        }
      >
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

export default withRouter(SongTableBodyItem);
