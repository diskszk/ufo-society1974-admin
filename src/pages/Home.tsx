import React from 'react';
import meido from '../assets/images/job_maid_meido_kissa.png';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { RootStore, User } from '../lib/types';
import { PrimalyButton } from '../components/UIKit';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { username } = useSelector<RootStore, User>((state) => state.user);

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
        <PrimalyButton
          label="ユーザー管理"
          onClick={() => dispatch(push('/users'))}
        />
        <PrimalyButton
          label="アルバムを管理"
          onClick={() => dispatch(push('/albums'))}
        />
      </div>
    </section>
  );
};

export default Home;
