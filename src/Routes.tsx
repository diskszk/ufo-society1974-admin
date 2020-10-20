import * as React from 'react';
// import { Switch } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { Home, Login, NotFound } from './pages';

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path='(/)?'><Home /></Route>
        <Route path='/login' component={Login} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
};
export default Routes;