import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { TableCell, TableHead, TableRow, IconButton } from '@material-ui/core';
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined';
import { RootStore, Album } from '../../lib/types';

const useStyles = makeStyles({
  addBtn: {
    padding: 0,
  },
});

const SongAddButton: React.FC = () => {
  const classes = useStyles();
  const { id } = useSelector<RootStore, Album>((state) => state.album);
  const history = useHistory();

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
          <IconButton
            onClick={(_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              history.push(`/albums/detail/${id}/edit`)
            }
          >
            <LibraryAddOutlinedIcon fontSize={'large'} />
          </IconButton>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default SongAddButton;
