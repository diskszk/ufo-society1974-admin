import * as React from 'react';
import { Switch } from 'react-router';
import { Link, Route } from 'react-router-dom';
import { Home, Login } from './pages';

import { useDispatch, useSelector } from 'react-redux';

const NotFound = () => {
  return (
    <h1>Page Not Found</h1>
  );
}


const Routes = () => {

  const selector = useSelector(state => state);

  const json = JSON.stringify(selector);
  console.log(json);
  // const rootPath = json.router.location.pathname;

  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        {/* <Route exact path='(/)?' component={Home} /> */}
        <Route path='/login' component={Login} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}
export default Routes;