import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from './Auth';
import { Home, Login, NotFound, SignUp, Reset, Songs, SongAdd } from './pages';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/login' component={Login} />
      <Auth>
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/reset' component={Reset} />
        <Route exact path='(/)?' component={Home} />

        {/* SongsCRUD */}
        <Route exact path='/songs' component={Songs} />
        <Route exact path='/songs/add' component={SongAdd} />
        {/* <Route exact path='/songs/edit' component={SongEdit} /> */}

        {/* <Route component={NotFound} /> */}
      </Auth>
    </Switch>
  )
};
export default Routes;