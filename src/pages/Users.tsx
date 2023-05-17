import React from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../components/UIKit";
import UserTable from "../components/users/UserTable";

const Users: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="page">
      <h1>ユーザー管理ページ</h1>
      <div className="spacing-div"></div>

      <div className="spacing-div"></div>
      <UserTable />

      <div className="button-container-row">
        <CustomButton
          disable={false}
          label="もどる"
          onClick={(_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            navigate("/")
          }
        />
      </div>
    </section>
  );
};

export default Users;
