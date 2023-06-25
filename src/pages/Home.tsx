import React from "react";
import { useHistory } from "react-router-dom";
import { CustomButton } from "../components/UIKit";
import meido from "../assets/images/job_maid_meido_kissa.png";
import { useSignedInUserState } from "../hooks/useSignedInUserState";
import { CircularProgress } from "@mui/material";

type PresentationProps = {
  username: string;
};

export const Presentation: React.FC<PresentationProps> = ({ username }) => {
  const history = useHistory();

  return (
    <section className="home page">
      <h1>HOME</h1>
      <div className="spacing-div"></div>
      <div>
        <h2>
          おかえりなさいませ{" "}
          <span className="username">
            {username ? username : <CircularProgress />}
          </span>
          さま！
        </h2>
      </div>
      <div className="spacing-div"></div>

      <div>
        <img alt="メイドさん" src={meido} />
      </div>
      <div className="spacing-div"></div>
      <h2>ご注文はどちらになさいますか？</h2>

      <div className="spacing-div"></div>

      <div className="button-container">
        <CustomButton
          label="ユーザー管理"
          onClick={(_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            history.push("/users")
          }
        />
        <CustomButton
          label="アルバムを管理"
          onClick={(_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            history.push("/albums")
          }
        />
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  const { signedInUser } = useSignedInUserState();

  const { username } = signedInUser;

  return <Presentation username={username} />;
};

export default Home;
