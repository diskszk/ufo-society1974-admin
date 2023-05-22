import React from 'react';
import { Song } from '../../lib/types';
import { TableBody } from '@material-ui/core/';
import { SongTableBodyItem } from './';

type Props = {
  songs: Song[];
};

export const SongTableBody: React.FC<Props> = ({ songs }) => {
  return (
    <TableBody>
      {songs.map((song) => (
        <SongTableBodyItem song={song} key={song.id} />
      ))}
    </TableBody>
  );
};
