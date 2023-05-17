import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton } from "../components/UIKit";
import { Album, RootStore, User } from "../lib/types";
import { SongTable, AlbumInfo } from "../components/songs";
import { getSingleAlbum } from "../lib/albums/getSingleAlbum";
import { createUpdateAlbumAction } from "../store/AlbumReducer";
import {
  createDisplayMessage,
  createFailedFetchAction,
  createRequestFetchAction,
  crateSuccessFetchAction,
} from "../store/LoadingStatusReducer";
import { ROLE } from "../constants";
import { useRedirectWithinSignedIn } from "../lib/users/useRedirectWithinSignedIn";

const Songs: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useRedirectWithinSignedIn();

  const urlParams = useParams<{ id: string }>();

  const albumId = urlParams.id || "";

  const album = useSelector<RootStore, Album>((state) => state.album);
  const { role } = useSelector<RootStore, User>((state) => state.user);

  let editButtonLabel: "アルバム編集" | "アルバム閲覧" | "" = "";

  if (role === ROLE.EDITOR) {
    editButtonLabel = "アルバム編集";
  } else {
    editButtonLabel = "アルバム閲覧";
  }

  useEffect(() => {
    const fetch = async () => {
      dispatch(createRequestFetchAction());

      try {
        const album = await getSingleAlbum(albumId);

        if (!album) {
          dispatch(createFailedFetchAction("アルバムが存在しません。"));
          navigate("/albums");
          return;
        } else {
          dispatch(createUpdateAlbumAction(album));
          dispatch(crateSuccessFetchAction());
        }
      } catch (e) {
        // dispatch(createFailedFetchAction(e.message));
        dispatch(createFailedFetchAction("error message"));

        navigate("/albums");
      }
    };

    if (albumId !== "") {
      fetch();
    } else {
      dispatch(createDisplayMessage("アルバムが登録されていません。"));
      navigate("/albums");
    }
  }, [dispatch, navigate, albumId]);

  return (
    <section className="page">
      <h1>曲の管理ページ</h1>
      <div className="spacing-div"></div>

      <div className="spacing-div"></div>
      <AlbumInfo album={album} />
      <SongTable albumId={albumId} />

      <div className="button-container-row">
        <CustomButton
          label="もどる"
          onClick={(_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            navigate("/albums")
          }
        />
        <CustomButton
          label={editButtonLabel}
          onClick={(_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            navigate(`/albums/edit/${albumId}`)
          }
        />
      </div>
    </section>
  );
};

export default Songs;
