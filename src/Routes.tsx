import * as React from 'react';
// import { Switch } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import Auth from './Auth';
import { Home, Login, NotFound, SignUp, Reset } from './pages';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/login' component={Login} />
      <Auth>
        <Route exact path='/reset' component={Reset} />
        <Route exact path='(/)?' component={Home} />
        <Route exact path='/signup' component={SignUp} />
        {/* <Route component={NotFound} /> */}
      </Auth>
    </Switch>
  )
};
export default Routes;