import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from './Auth';
import {
  Home,
  Login,
  SignUp,
  Reset,
  Songs,
  SongEdit,
  Users,
  Albums,
  AlbumEdit,
} from './pages';

const Routes = () => {
  return (
    <Switch>
      <Route exact path={'/login'} component={Login} />
      <Route exact path={'/reset'} component={Reset} />

      <Auth>
        <Route exact path={'(/)?'} component={Home} />

        {/* Users */}
        <Route exact path={'/users'} component={Users} />
        <Route exact path={'/signup'} component={SignUp} />

        {/* Albums */}
        <Route exact path={'/albums'} component={Albums} />
        <Route path={'/albums/edit/(:id)?'} component={AlbumEdit} />

        {/* Songs */}
        <Route exact path={`/albums/detail/:id`} component={Songs} />
        <Route path={`/albums/detail/:id/edit`} component={SongEdit} />
      </Auth>
    </Switch>
  );
};

export default Routes;
