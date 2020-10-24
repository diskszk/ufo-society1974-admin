import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';

type Props = {
  label: string;
  onClick: () => void;
}
[]
const useStyles = makeStyles({
  button: {
    backgroundColor: "#efefef",
    color: "#000",
    fontSize: "1em",
    height: "3em",
    marginBottom: "2.25em",
    width: "16em"
  }
})

const PrimalyButton = (props: Props) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      variant="contained" onClick={() => props.onClick()}
    >
      {props.label}
    </Button>
  );
}

export default PrimalyButton;