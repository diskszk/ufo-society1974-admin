import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Album } from "../../lib/types";
import { getAlbums } from "../../lib/albums/getAlbums";
import {
  createRequestFetchAction,
  createFailedFetchAction,
  crateSuccessFetchAction,
} from "../../store/LoadingStatusReducer";

import { AlbumTableItem } from "./";

type PresentationProps = {
  albums: Album[];
};

export const Presentation: React.FC<PresentationProps> = ({ albums }) => (
  <ul className="album-list">
    {albums.map((album: Album) => {
      return <AlbumTableItem key={album.id} album={album} />;
    })}
  </ul>
);

export const AlbumTable: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      try {
        dispatch(createRequestFetchAction());
        const albumList = await getAlbums();

        setAlbums(albumList);
        dispatch(crateSuccessFetchAction());
      } catch (e) {
        // dispatch(createFailedFetchAction(e.message));
        dispatch(createFailedFetchAction("error message"));
      }
    };

    fetch();
  }, [setAlbums, dispatch]);

  return <Presentation albums={albums} />;
};
