import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/core/styles';
import { RootStore, Album, Song, User } from '../../lib/types';
import { TableBody, TableCell, TableRow } from '@material-ui/core/';
import { ROLE } from '../../constans';
import { updateSongsAction } from '../../store/SongsReducer';
import { deleteSong, getSongs } from '../../lib/songs';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  actionBtn: {
    cursor: 'pointer',
  },
});

type Props = {
  songs: Song[];
};

const SongTableBody: React.FC<Props> = ({ songs }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { role } = useSelector<RootStore, User>((state) => state.user);
  const album = useSelector<RootStore, Album>((state) => state.album);
  const albumId = album.id;

  const handleDeleteSong = (songId: string, title: string): void => {
    // edditer only
    if (role !== ROLE.EDITOR) {
      alert('編集者のみ曲を削除できます。');
      return;
    }
    if (window.confirm(`${title}を削除しますか?`)) {
      deleteSong(albumId, songId)
        .catch((e) => {
          throw new Error(e);
        })
        .then(() => {
          // do refresh
          getSongs(albumId).then((songList) => {
            dispatch(updateSongsAction(songList));
          });
        });
    } else {
      return;
    }
  };

  return (
    <TableBody>
      {songs.map((song) => (
        <TableRow key={song.id}>
          <TableCell align="right" component="th" scope="row">
            {song.id}
          </TableCell>
          <TableCell>{song.title}</TableCell>
          <TableCell>{song.story}</TableCell>
          <TableCell className={classes.actionBtn}>再生</TableCell>
          <TableCell
            className={classes.actionBtn}
            onClick={() =>
              dispatch(push(`/albums/detail/${albumId}/edit/${song.id}`))
            }
          >
            編集
          </TableCell>
          <TableCell
            className={classes.actionBtn}
            onClick={() => handleDeleteSong(song.id, song.title)}
          >
            削除
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default SongTableBody;
