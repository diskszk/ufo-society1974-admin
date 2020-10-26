import React from 'react';
import { Link } from 'react-router-dom';
import meido from '../assets/images/job_maid_meido_kissa.png'
import { useSelector } from 'react-redux';
import { User } from '../reducks/users/types';
import { RootStore } from '../reducks/store/initialState';
import { LinkButton, PrimalyButton } from '../components/UIKit';

const Home = () => {

  const UF_SOCIETY_OFFISIAL = "https://ufo-society-1974.web.app/";

  const users = useSelector<RootStore, User>(state => state.users);
  const username = users.username;

  return (
    <section className="home page">
      <h1>HOME</h1>
      <div>
        <h2>おかえりなさいませ{username}さま！</h2>
      </div>
      <div>
        <img alt="メイドさん" src={meido} />
      </div>
      <p>ご注文はどちらになさいますか？</p>

      <div className="spacing-div"></div>

      <div className="button-container">
        <Link className="link-button" to="/">
          {/* primaly(?)buttonに統合する */}
          <LinkButton
            path="/#"
            label={'管理者登録'}
          />
        </Link>
        <LinkButton
          path="/songs"
          label={'歌詞を追加・変種'}
        />
      </div>
    </section>
  );
}

export default Home;
