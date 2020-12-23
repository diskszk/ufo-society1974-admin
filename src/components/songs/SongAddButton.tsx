import React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { TableCell, TableHead, TableRow, IconButton } from '@material-ui/core';
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined';
import { RootStore, Album } from '../../lib/types';

import * as H from 'history';

const useStyles = makeStyles({
  addBtn: {
    padding: 0,
  },
});

interface Props extends RouteComponentProps<{ id: string }> {
  history: H.History;
}

const SongAddButton: React.FC<Props> = ({ history }) => {
  const classes = useStyles();
  const { id } = useSelector<RootStore, Album>((state) => state.album);

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
          <IconButton onClick={() => history.push(`/albums/detail/${id}/edit`)}>
            <LibraryAddOutlinedIcon fontSize={'large'} />
          </IconButton>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default withRouter(SongAddButton);
