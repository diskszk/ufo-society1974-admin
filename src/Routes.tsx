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
import { ROUTER_PATHS } from './constans';

const Routes = () => {
  return (
    <Switch>
      <Route exact path={ROUTER_PATHS.LOGIN} component={Login} />
      <Route exact path={ROUTER_PATHS.RESET} component={Reset} />

      <Auth>
        <Route exact path={'(/)?'} component={Home} />

        {/* Uasers */}
        <Route exact path={ROUTER_PATHS.USERS} component={Users} />
        <Route exact path={ROUTER_PATHS.SIGN_UP} component={SignUp} />

        {/* Albums */}
        <Route exact path={ROUTER_PATHS.ALBUMS} component={Albums} />
        <Route path={ROUTER_PATHS.ALBUM_EDIT} component={AlbumEdit} />

        {/* Songs */}
        <Route exact path={ROUTER_PATHS.SONGS} component={Songs} />
        <Route path={ROUTER_PATHS.SONG_EDIT} component={SongEdit} />
      </Auth>
    </Switch>
  );
};
export default Routes;
