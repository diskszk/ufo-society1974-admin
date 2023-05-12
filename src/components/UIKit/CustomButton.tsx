import React from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";

const useStyles = makeStyles({
  button: {
    backgroundColor: "#efefef",
    color: "#000",
    fontSize: "1em",
    height: "3em",
    marginBottom: "2.25em",
    width: "12em",
    zIndex: 0,
  },
});

type Props = {
  label: string;
  onClick: (_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disable?: boolean;
};

const CustomButton: React.FC<Props> = ({ label, onClick, disable = false }) => {
  const classes = useStyles();

  return (
    <Button
      disabled={disable}
      className={classes.button}
      variant="contained"
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
