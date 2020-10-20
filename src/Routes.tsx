import * as React from 'react';
// import { Switch } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { Home, Login, NotFound, SignUp } from './pages';

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path='(/)?'><Home /></Route>
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={SignUp} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
};
export default Routes;