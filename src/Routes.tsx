import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from './Auth';
import { Home, Login, SignUp, Reset, Songs, SongEdit, Users, Albums, AlbumEdit } from './pages';
import { URL } from './constans';

const Routes = () => {
  return (
    <Switch>
      <Route exact path={URL.LOGIN} component={Login} />
      <Route exact path={URL.RESET} component={Reset} />

      <Auth>
        <Route exact path={'(/)?'} component={Home} />

        {/* Uasers */}
        <Route exact path={URL.USERS} component={Users} />
        <Route exact path={URL.SIGN_UP} component={SignUp} />

        {/* Albums */}
        <Route exact path={URL.ALBUMS} component={Albums} />
        <Route path={URL.ALBUM_EDIT} component={AlbumEdit} />

        {/* Songs */}
        <Route exact path={URL.SONGS} component={Songs} />
        <Route path={URL.SONG_EDIT} component={SongEdit} />
      </Auth>
    </Switch>
  )
};
export default Routes;