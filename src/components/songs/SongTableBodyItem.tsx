import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootStore, Album, Song, User } from "../../lib/types";
import { TableCell, TableRow } from "@mui/material";
import { ROLE } from "../../constants";
import { createUpdateSongsAction } from "../../store/SongsReducer";
import { deleteSong, getSongs } from "../../lib/songs";
import {
  createDisplayMessage,
  createFailedFetchAction,
  createRequestFetchAction,
  crateSuccessFetchAction,
} from "../../store/LoadingStatusReducer";
import { checkRole } from "../../lib/helpers";

type Props = {
  song: Song;
};

export const SongTableBodyItem: React.FC<Props> = ({ song }) => {
  const dispatch = useDispatch();
  const { role } = useSelector<RootStore, User>((state) => state.user);
  const history = useHistory();
  const album = useSelector<RootStore, Album>((state) => state.album);
  const albumId = album.id;

  const songId = parseInt(song.id, 10).toString();
  const audio: HTMLAudioElement = useMemo(() => {
    return new Audio(song.songFile.path);
  }, [song.songFile.path]);

  const handlePlayMusic = useCallback(
    (_ev: React.MouseEvent<HTMLTableCellElement, MouseEvent>): void => {
      if (audio.error) {
        dispatch(createDisplayMessage("曲がアップロードされていません。"));
        return;
      }
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    },
    [audio, dispatch]
  );

  const handleDeleteSong = useCallback(
    async (
      _ev: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>
    ): Promise<void> => {
      const allowed = checkRole(ROLE.EDITOR, role);

      if (!allowed) {
        dispatch(createDisplayMessage("編集者のみ曲を削除できます。"));
        return;
      }
      if (!window.confirm(`${song.title}を削除しますか?`)) {
        return;
      }
      try {
        dispatch(createRequestFetchAction());
        await deleteSong(albumId, song.id);

        // 削除後にリストを更新する
        const songList = await getSongs(albumId);

        dispatch(createUpdateSongsAction(songList));
        dispatch(crateSuccessFetchAction());
      } catch {
        dispatch(
          createFailedFetchAction(
            "曲の削除に失敗しました。\n通信環境をご確認の上再度お試しください。"
          )
        );
      }
    },
    [dispatch, albumId, song, role]
  );

  return (
    <TableRow key={song.id}>
      <TableCell align="right" component="th" scope="row">
        {songId}
      </TableCell>
      <TableCell>{song.title}</TableCell>
      <TableCell>{song.story}</TableCell>
      <TableCell
        sx={{
          cursor: "pointer",
        }}
        onClick={handlePlayMusic}
      >
        {/* want: 再生/停止 で切り替わるようにしたい */}
        <p>再生</p>
      </TableCell>
      <TableCell
        sx={{
          cursor: "pointer",
        }}
        onClick={(_ev: React.MouseEvent<HTMLTableCellElement, MouseEvent>) =>
          history.push(`/albums/detail/${albumId}/edit/${song.id}`)
        }
      >
        {role === ROLE.EDITOR ? <p>編集</p> : <p>閲覧</p>}
      </TableCell>
      <TableCell
        sx={{
          cursor: "pointer",
        }}
        onClick={handleDeleteSong}
      >
        削除
      </TableCell>
    </TableRow>
  );
};

<td>
  <button>The table body</button>
</td>;
