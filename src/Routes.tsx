import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from './Auth';
import { Home, Login, NotFound, SignUp, Reset, Songs, SongEdit, Users } from './pages';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/login' component={Login} />
      <Route exact path='/reset' component={Reset} />

      <Auth>
        <Route exact path='(/)?' component={Home} />


        {/* UasersCRUD */}
        <Route exact path="/users" component={Users} />
        <Route exact path='/signup' component={SignUp} />

        {/* SongsCRUD */}
        <Route exact path='/songs' component={Songs} />
        <Route path='/songs/edit(/:id)?' component={SongEdit} />

      </Auth>
    </Switch>
  )
};
export default Routes;