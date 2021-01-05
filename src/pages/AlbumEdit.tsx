import React, { useCallback, useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { CustomButton, TextInput } from '../components/UIKit';
import ImageUploadForm from '../components/albumEdit/ImageUploadForm';
import { RootStore, File, User, Services } from '../lib/types';
import { saveAlbum, deleteAlbum } from '../lib/albums';
import { ROLE } from '../constants';
import { getSingleAlbum } from '../lib/albums/getSingleAlbum';
import { updateImageAction, clearImageAction } from '../store/ImageReducer';
import {
  displayMessage,
  failedFetchAction,
  requestFetchAction,
  successFetchAction,
} from '../store/LoadingStatusReducer';
import { validatePublished_date } from '../lib';

interface Props extends RouteComponentProps<{}> {}

// Edit or Add Album only
const AlbumEdit: React.FC<Props> = ({ history }) => {
  const dispatch = useDispatch();

  let id = window.location.pathname.split('/albums/edit')[1];

  if (id !== '') {
    id = id.split('/')[1];
  }
  const { role } = useSelector<RootStore, User>((state) => state.user);
  const imageFile = useSelector<RootStore, File>((state) => state.image);

  const [discription, setDiscription] = useState('');
  const [publish_date, setPublish_date] = useState('');
  const [title, setTitle] = useState('');
  const [appleMusicURL, setAppleMusicURL] = useState('');
  const [spotifyURL, setSpotifyURL] = useState('');
  const [iTunesURL, setITunesURL] = useState('');
  const [bandcampURL, setBandcampURL] = useState('');

  const inputDiscription = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDiscription(e.target.value);
    },
    [setDiscription]
  );
  const inputPublish_date = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPublish_date(e.target.value);
    },
    [setPublish_date]
  );
  const inputTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    [setTitle]
  );
  const inputAppleMusicURL = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAppleMusicURL(e.target.value);
    },
    [setAppleMusicURL]
  );
  const inputSpotifyURL = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSpotifyURL(e.target.value);
    },
    [setSpotifyURL]
  );
  const inputITunesURL = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setITunesURL(e.target.value);
    },
    [setITunesURL]
  );
  const inputBandcampURL = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBandcampURL(e.target.value);
    },
    [setBandcampURL]
  );

  const handleSave = useCallback(
    (_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      // Validation
      if (!title || !publish_date) {
        dispatch(displayMessage('必須項目が未入力です。'));
        return;
      }
      if (!validatePublished_date(publish_date)) {
        dispatch(
          displayMessage('公開日は\n"YYYY-MM-DD"\nの形式で入力してください。')
        );
        return;
      }
      if (!validatePublished_date(publish_date)) {
        dispatch(
          displayMessage('公開日は\nYYYY-MM-DD\nの形式で入力してください。')
        );
        return;
      }
      const services: Services = {
        AppleMusic: appleMusicURL,
        Spotify: spotifyURL,
        iTunes: iTunesURL,
        Bandcamp: bandcampURL,
      };

      try {
        dispatch(requestFetchAction());
        saveAlbum(title, imageFile, discription, services, publish_date, id);
        dispatch(displayMessage(`アルバムを保存しました。`));
        dispatch(successFetchAction());
        history.push('/albums');
      } catch {
        dispatch(
          failedFetchAction(
            'アルバムの保存に失敗しました。\n通信環境をご確認の上再度お試しください。'
          )
        );
        return;
      }
    },
    [
      discription,
      title,
      imageFile,
      publish_date,
      appleMusicURL,
      spotifyURL,
      iTunesURL,
      bandcampURL,
    ]
  );

  const handleBack = useCallback(
    (_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
      if (window.confirm('編集を破棄します。')) {
        history.push('/albums');
      } else {
        return;
      }
    },
    []
  );

  const handleDelete = useCallback(
    async (
      _ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): Promise<void> => {
      if (role !== ROLE.EDITOR) {
        dispatch(displayMessage('削除権限がありません。'));
        return;
      }
      if (!window.confirm('アルバムを削除しますか？')) {
        return;
      }
      try {
        dispatch(requestFetchAction());
        await deleteAlbum(id);
        dispatch(successFetchAction());
        history.push('/albums');
      } catch {
        dispatch(
          failedFetchAction(
            'アルバムの削除に失敗しました。\n通信環境をご確認の上再度お試しください。'
          )
        );
      }
    },
    []
  );

  useEffect(() => {
    if (id === '') {
      // New
      dispatch(clearImageAction());
    } else {
      // Edit
      const fetch = async () => {
        dispatch(requestFetchAction());

        try {
          const res = await getSingleAlbum(id);

          if (!res) {
            dispatch(failedFetchAction('アルバムが存在しません。'));
            history.push('/albums');
            return;
          } else {
            setTitle(res.title);
            setDiscription(res.discription);
            setPublish_date(res.publish_date);
            setAppleMusicURL(res.services.AppleMusic);
            setSpotifyURL(res.services.Spotify);
            setITunesURL(res.services.iTunes);
            setBandcampURL(res.services.Bandcamp);
            dispatch(updateImageAction(res.imageFile));
          }
          dispatch(successFetchAction());
        } catch (e) {
          dispatch(failedFetchAction(e.message));
        }
      };

      fetch();
    }
  }, [id]);

  return (
    <section className="album-edit">
      <h1>アルバムを追加・編集</h1>
      <div className="inputs-container">
        {id && (
          <div className="delete-icon">
            <span>アルバムを削除する</span>
            <IconButton onClick={handleDelete}>
              <DeleteOutlineIcon />
            </IconButton>
          </div>
        )}
        <TextInput
          fullWidth={false}
          label={'アルバムタイトル'}
          multiline={false}
          required={true}
          rows={1}
          value={title}
          type={'text'}
          onChange={inputTitle}
        />
        <ImageUploadForm image={imageFile} />
        <div className="spacing-div" />

        <div className="album-discription__input">
          <TextInput
            fullWidth={false}
            label={'説明'}
            multiline={true}
            required={false}
            rows={8}
            value={discription}
            type={'text'}
            onChange={inputDiscription}
          />
        </div>
        <div className="spacing-div" />

        <TextInput
          fullWidth={false}
          label={'Apple Music'}
          multiline={false}
          required={false}
          rows={1}
          value={appleMusicURL}
          type={'text'}
          onChange={inputAppleMusicURL}
        />
        <TextInput
          fullWidth={false}
          label={'Spotify'}
          multiline={false}
          required={false}
          rows={1}
          value={spotifyURL}
          type={'text'}
          onChange={inputSpotifyURL}
        />
        <TextInput
          fullWidth={false}
          label={'iTunes'}
          multiline={false}
          required={false}
          rows={1}
          value={iTunesURL}
          type={'text'}
          onChange={inputITunesURL}
        />
        <TextInput
          fullWidth={false}
          label={'Bandcamp'}
          multiline={false}
          required={false}
          rows={1}
          value={bandcampURL}
          type={'text'}
          onChange={inputBandcampURL}
        />

        <TextInput
          fullWidth={false}
          label={'公開日(YYYY-MM-DD)'}
          multiline={false}
          required={true}
          rows={1}
          value={publish_date}
          type={'text'}
          onChange={inputPublish_date}
        />

        <div className="button-container-row">
          <CustomButton label={'もどる'} onClick={handleBack} />
          <CustomButton
            disable={false}
            label={'保存する'}
            onClick={handleSave}
          />
        </div>
      </div>
    </section>
  );
};

export default withRouter(AlbumEdit);
