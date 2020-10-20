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
    </header >
  );
}

export default Header;