import React from 'react';
// import { Link } from 'react-router-dom';
import { signin } from '../reducks/users/operation';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router'

const Login = () => {

  const dispatch = useDispatch();

  return (
    <div>
      <h1>Login</h1>
      <button
        // onClick={() => dispatch(signin())}
        onClick={() => dispatch(push('/'))}>
        ログイン
      </button>

      {/* <Link to="/">Home</Link> */}
    </div>
  );
}

export default Login;