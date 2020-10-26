import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

type Props = {
  label: string;
  path: string;
}

const useStyles = makeStyles({
  button: {
    display: "block",
    backgroundColor: "#efefef",
    color: "#000",
    fontSize: "1em",
    height: "3em",
    marginBottom: "2.25em",
    width: "16em",
  }
})

const LinkButton = (props: Props) => {
  const classes = useStyles();

  return (
    <div>
      <Link role="button" className={classes.button} to={props.path} >
        {props.label}
      </Link>
    </div>
  );
}

export default LinkButton;