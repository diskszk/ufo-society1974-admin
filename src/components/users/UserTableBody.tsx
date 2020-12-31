import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { User } from '../../lib/types';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  actionBtn: {
    cursor: 'pointer',
  },
});

type Props = {
  rows: User[];
  onClick: (uid: string, username: string, role: string) => void;
};

const UserTableBody = (props: Props) => {
  const classes = useStyles();

  return (
    <TableBody>
      {props.rows.map((row) => (
        <TableRow key={row.uid}>
          <TableCell component="th" scope="row">
            {row.uid}
          </TableCell>
          <TableCell>{row.username}</TableCell>
          <TableCell>{row.role}</TableCell>
          <TableCell
            className={classes.actionBtn}
            onClick={() => props.onClick(row.uid, row.username, row.role)}
          >
            削除
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default UserTableBody;
