import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../../reducks/users/operation';

const Header = () => {
  const dispatch = useDispatch();

  return (
    <header>
      <p>ヘッダー</p>

      <Link to="/login">
        <button>
          ろぐいんはこちら
        </button>
      </Link>
      <Link to="/signup">
        <button>
          管理者登録
        </button>
      </Link>
      test@example.com
      <button onClick={() => dispatch(logOut())}>
        ログアウト
      </button>
    </header >
  );
}

export default Header;