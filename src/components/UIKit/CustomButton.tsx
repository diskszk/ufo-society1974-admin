import { Button, ButtonProps } from "@mui/material";

type Props = {
  label: string;
  onClick: (_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disable?: boolean;
};

const CustomButton: React.FC<Props> = ({ label, onClick, disable = false }) => {
  return (
    <Button
      disabled={disable}
      sx={{
        backgroundColor: "#efefef",
        color: "#000",
        fontSize: "1em",
        height: "3em",
        marginBottom: "2.25em",
        width: "12em",
        zIndex: 0,
      }}
      variant="contained"
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default CustomButton;

export const StyledButton: React.FC<ButtonProps> = (props) => (
  <Button
    {...props}
    sx={{
      backgroundColor: "#efefef",
      color: "#000",
      fontSize: "1em",
      height: "3em",
      marginBottom: "2.25em",
      width: "12em",
      zIndex: 0,
    }}
    variant="contained"
  >
    {props.children}
  </Button>
);
