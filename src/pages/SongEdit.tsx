import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { PrimalyButton, TextInput } from '../components/UIKit';
import { getSingleSong, getSongs, saveSong } from '../lib/songs';
import SongUploadForm from '../components/songs/SongUploadForm';
import { File, Song } from '../lib/types';

const SongEdit = () => {
  const dispatch = useDispatch();

  const albumId = useMemo(
    () => window.location.pathname.split('/albums/detail')[1].split('/')[1],
    []
  );
  let songId = window.location.pathname.split(
    `/albums/detail/${albumId}/edit`
  )[1];
  if (songId) {
    songId = songId.split('/')[1];
  }

  const [id, setId] = useState(''),
    [title, setTitle] = useState(''),
    [story, setStory] = useState('無し'),
    [lyric, setLyric] = useState(''),
    [wordsRights, setWordsRights] = useState('amane toda'),
    [musicRights, setMusicRights] = useState('amane toda');

  const [isUploaded, setIsUploaded] = useState(false);

  const [songFile, setSongFile] = useState<File>({
    filename: '',
    path: '',
  });

  const inputId = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setId(e.target.value);
    },
    [setId]
  );
  const inputTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    [setTitle]
  );
  const inputStory = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setStory(e.target.value);
    },
    [setStory]
  );
  const inputLyric = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLyric(e.target.value);
    },
    [setLyric]
  );
  const inputWordsRights = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLyric(e.target.value);
    },
    [setWordsRights]
  );
  const inputMusicRights = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMusicRights(e.target.value);
    },
    [setMusicRights]
  );

  const clickSave = async () => {
    if (id == '') {
      alert('IDを入力してください');
      return false;
    }

    const leftJustifiedId = ('0000' + id).slice(-4);

    const newSong: Song = {
      id: leftJustifiedId,
      title: title,
      songFile: songFile,
      story: story,
      lyric: lyric,
    };
    await dispatch(saveSong(newSong, albumId));
    dispatch(push(`/albums/detail/${albumId}`));
  };

  useEffect(() => {
    if (songId === '') {
      // New
      getSongs(albumId).then((songList) => {
        const latestId = (songList.length + 1).toString();
        setId(latestId);
      });
    } else {
      // Edit
      getSingleSong(albumId, songId).then((song: Song) => {
        if (!song) {
          return;
        }
        setId(song.id);
        setTitle(song.title);
        setStory(song.story);
        setLyric(song.lyric);
      });
    }
  }, [setId, setSongFile]);

  return (
    <section>
      <h1>曲を追加・編集</h1>

      <div className="inputs-container">
        <TextInput
          fullWidth={false}
          label={'トラックID(表示する順番)'}
          multiline={false}
          required={true}
          rows={1}
          value={id}
          type={'number'}
          onChange={inputId}
        />
        <p>デフォルトのIDで一番下に表示されます。</p>

        <TextInput
          fullWidth={false}
          label={'タイトル'}
          multiline={false}
          required={false}
          rows={1}
          value={title}
          type={'text'}
          onChange={inputTitle}
        />
        <SongUploadForm
          id={id.toString()}
          musicFile={songFile}
          setSongFile={setSongFile}
          isUploaded={isUploaded}
          setIsUploaded={setIsUploaded}
        />
        {songFile.filename && (
          <div className="music=player">
            <audio
              controls
              // controlsList="nodownload"
              src={songFile.path}
            />
          </div>
        )}

        <div className="input-author">
          <TextInput
            fullWidth={false}
            label={'作詞者'}
            multiline={false}
            required={false}
            rows={1}
            value={wordsRights}
            type={'text'}
            onChange={inputWordsRights}
          />
          <TextInput
            fullWidth={false}
            label={'作曲者'}
            multiline={false}
            required={false}
            rows={1}
            value={musicRights}
            type={'text'}
            onChange={inputMusicRights}
          />
        </div>
        <TextInput
          fullWidth={false}
          label={'元ネタ'}
          multiline={false}
          required={false}
          rows={1}
          value={story}
          type={'text'}
          onChange={inputStory}
        />
        <TextInput
          fullWidth={false}
          label={'歌詞'}
          multiline={true}
          required={false}
          rows={16}
          value={lyric}
          type={'text'}
          onChange={inputLyric}
        />

        <div className="button-container-row">
          <PrimalyButton
            label="もどる"
            onClick={() => dispatch(push(`/albums/detail/${albumId}`))}
          />
          <PrimalyButton label="保存する" onClick={() => clickSave()} />
        </div>
      </div>
    </section>
  );
};

export default SongEdit;
