import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootStore, User } from "../lib/types";
import { CustomButton } from "../components/UIKit";
import meido from "../assets/images/job_maid_meido_kissa.png";
import { useRedirectWithinSignedIn } from "../lib/users/useRedirectWithinSignedIn";

const Home: React.FC = () => {
  useRedirectWithinSignedIn();

  const { username } = useSelector<RootStore, User>((state) => state.user);
  const navigate = useNavigate();

  return (
    <section className="home page">
      <h1>HOME</h1>
      <div className="spacing-div"></div>
      <div>
        <h2>
          おかえりなさいませ <span className="username">{username}</span> さま！
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
            navigate("/users")
          }
        />
        <CustomButton
          label="アルバムを管理"
          onClick={(_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            navigate("/albums")
          }
        />
      </div>
    </section>
  );
};

export default Home;
