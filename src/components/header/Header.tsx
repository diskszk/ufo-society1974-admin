import React from 'react'
import { Link } from 'react-router-dom';

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
    </header >
  );
}

export default Header;