import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Album, RootStore, User } from "../../lib/types";
import { createUpdateAlbumAction } from "../../store/AlbumReducer";
import { IconButton } from "@mui/material";
import { BorderColor } from "@mui/icons-material";
import { ROLE } from "../../constants";

type Props = {
  album: Album;
};

export const AlbumTableItem: React.FC<Props> = ({ album }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { role } = useSelector<RootStore, User>((state) => state.user);

  const handleEditAlbumClick = useCallback(
    (
      _ev: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>
    ): void => {
      dispatch(createUpdateAlbumAction(album));
      history.push(`/albums/edit/${album.id}`);
    },
    [dispatch, history, album]
  );

  const handleDetailAlbumClick = useCallback(
    (_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
      dispatch(createUpdateAlbumAction(album));
      history.push(`/albums/detail/${album.id}`);
    },
    [dispatch, history, album]
  );

  return (
    <li className="album-item">
      <p>{album.title}</p>
      <div className="album-image" onClick={handleEditAlbumClick}>
        <img src={album.imageFile.path} alt={"アルバムの画像"} />
      </div>
      <div className="album-image-footer">
        {role === ROLE.EDITOR ? (
          <span>アルバムを編集する</span>
        ) : (
          <span>アルバムを閲覧する</span>
        )}
        <IconButton onClick={handleEditAlbumClick}>
          <BorderColor />
        </IconButton>
        <br />
        {role === ROLE.EDITOR ? (
          <span>アルバムの曲を編集する</span>
        ) : (
          <span>アルバムの曲を閲覧する</span>
        )}
        <IconButton onClick={handleDetailAlbumClick}>
          <BorderColor />
        </IconButton>
      </div>
    </li>
  );
};
