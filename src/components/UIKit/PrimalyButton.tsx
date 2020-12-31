import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';

type Props = {
  label: string;
  onClick: () => void;
  isDisable?: boolean;
};

const useStyles = makeStyles({
  button: {
    backgroundColor: '#efefef',
    color: '#000',
    fontSize: '1em',
    height: '3em',
    marginBottom: '2.25em',
    width: '12em',
    zIndex: 0,
  },
});

const PrimalyButton = (props: Props) => {
  const classes = useStyles();

  return (
    <Button
      disabled={props.isDisable}
      className={classes.button}
      variant="contained"
      onClick={() => props.onClick()}
    >
      {props.label}
    </Button>
  );
};

export default PrimalyButton;
