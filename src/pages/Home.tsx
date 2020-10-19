import React from 'react';
// import { Link } from 'react-router-dom';
import meido from '../assets/images/job_maid_meido_kissa.png'
import { useSelector } from 'react-redux';
import { getUserId, getUserName } from '../reducks/users/selectors';
import { IUser } from '../reducks/users/types';
import { RootState } from '../reducks/store/initialState';

const Home = () => {

  const UF_SOCIETY_OFFISIAL = "https://ufo-society-1974.web.app/";

  const selector = useSelector<RootState, any>(state => state);
  const uid = getUserId(selector);
  const username = getUserName(selector);
  console.log(selector);



  return (
    <div className="home">
      <h1>管理者ページ</h1>
      <div>
        <p>id: {uid}</p>
        <h2>おかえりなさいませ{username}さま！</h2>
      </div>
      <div>
        <img alt="メイドさん" src={meido} />
      </div>
      <p>ご注文はどちらになさいますか？</p>

      <div className="spacing-div"></div>

      <div className="button-container">
        <div>
          {/* <Link to="/admin/add-user"> */}
          <button>管理者情報</button>
          {/* </Link> */}
        </div>
        <div>
          {/* <Link to="admin/add-song"> */}
          <button>歌詞を追加・変種</button>
          {/* </Link> */}
          {/* <Link to="login">
            <button>ログイン</button>
          </Link> */}
          {/* <button onClick={() => dispatch(push("/login"))}></button> */}
        </div>
        <div>
          <a href={UF_SOCIETY_OFFISIAL} target="_blank" rel="noopener noreferrer">
            <button>ﾎｰﾑﾍﾟｰｼﾞへ移動</button>
          </a>
        </div>
      </div>

    </div>
  );
}

export default Home;
