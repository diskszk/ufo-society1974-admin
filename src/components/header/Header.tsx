import React from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../../reducks/users/operation';

const Header = () => {
  const dispatch = useDispatch();

  const UFO_SOCIETY_OFFISIAL = "https://ufo-society-1974.web.app/";


  return (
    <header>
      <div className="header">
        <div className="header-content">
          <a href={UFO_SOCIETY_OFFISIAL} target="_blank" rel="noopener noreferrer">UFO Societyホームページ</a>
          <a role="button" onClick={() => dispatch(logOut())}>ログアウト</a>
        </div>
      </div>
    </header >
  );
}

export default Header;