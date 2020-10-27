import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

type Props = {
  key: number;
  id: number;
  title: string;
  titleKana: string;
  story: string;
  timestamp?: firebase.firestore.Timestamp;
  onClick: () => void;
}

const SongElement = (props: Props) => {

  const dispatch = useDispatch();

  return (
    <li key={props.key}>
      <div className="song-element">
        <p className="id number">{props.id}</p>
        <p className="title">{props.title}</p>
        <p className="title-kana">{props.titleKana}</p>
        <p className="story">{props.story}</p>
        <div
          className="edit icon-button"
          onClick={() => dispatch(push(`/songs/edit/${props.id}`))}
        >
          <EditIcon />
        </div>
        <div
          className="delete icon-button"
          onClick={() => props.onClick()}
        >
          <DeleteOutlineIcon />
        </div>
      </div>
    </li>
  )
}

export default SongElement;
