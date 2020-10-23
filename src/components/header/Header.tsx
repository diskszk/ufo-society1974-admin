import React from 'react'
import { Link } from 'react-router-dom';

import Users from './users';
const Header = () => {
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
      <Users />
    </header >
  );
}

export default Header;