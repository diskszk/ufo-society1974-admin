import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Song } from './types';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  actionBtn: {
    cursor: "pointer"
  }
});

type Props = {
  rows: Song[];
  onClick: (id: number, title: string) => void;
}

const SongTableBody = (props: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (

    <TableBody>
      {props.rows.map((row) => (
        <TableRow key={row.id}>
          <TableCell align="right" component="th" scope="row">
            {row.id}
          </TableCell>
          <TableCell>{row.title}</TableCell>
          <TableCell>{row.story}</TableCell>
          <TableCell>
            再生
          </TableCell>
          <TableCell
            className={classes.actionBtn}
            onClick={() => dispatch(push(`/songs/edit/${row.id}`))}
          >編集
                </TableCell>
          <TableCell
            className={classes.actionBtn}
            onClick={() => props.onClick(row.id, row.title)}
          >削除</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default SongTableBody;