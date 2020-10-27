import React from 'react';
import meido from '../assets/images/job_maid_meido_kissa.png'
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { User } from '../reducks/users/types';
import { RootStore } from '../reducks/store/initialState';
import { PrimalyButton } from '../components/UIKit';

const Home = () => {


  const dispatch = useDispatch();
  const users = useSelector<RootStore, User>(state => state.users);
  const username = users.username;

  return (
    <section className="home page">
      <h1>HOME</h1>
      <div className="spacing-div"></div>
      <div>
        <h2>おかえりなさいませ{username}さま！</h2>
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
          label="曲を管理"
          onClick={() => dispatch(push('/songs'))}
        />
      </div>
    </section>
  );
}

export default Home;
