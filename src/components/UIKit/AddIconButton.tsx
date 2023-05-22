import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import LibraryAddOutlinedIcon from "@material-ui/icons/LibraryAddOutlined";

type Props = {
  allowedRole: string;
  currentRole: string;
  onClick: (_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  label: string;
};
export const AddIconButton: React.FC<Props> = ({
  allowedRole,
  currentRole,
  onClick,
  label,
}) => {
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    // 権限チェック
    if (allowedRole === currentRole) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [setDisable, allowedRole, currentRole]);

  return (
    <>
      <span>{label}</span>
      <IconButton disabled={disable} onClick={onClick}>
        <LibraryAddOutlinedIcon fontSize={'large'} />
      </IconButton>
    </>
  );
};
