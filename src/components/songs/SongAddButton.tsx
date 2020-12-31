import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined';
import { RootStore, Album } from '../../lib/types';

import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  addBtn: {
    padding: 0,
  },
});

const SongAddButton = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useSelector<RootStore, Album>((state) => state.album);

  const handleAddSong = () => {
    dispatch(push(`/albums/detail/${id}/edit`));
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell className={classes.addBtn}>
          <span>曲を追加</span>
          <IconButton onClick={() => handleAddSong()}>
            <LibraryAddOutlinedIcon fontSize={'large'} />
          </IconButton>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default SongAddButton;
