import { Switch, Route } from "react-router-dom";
import Auth from "./Auth";
import {
  Home,
  Login,
  CreateAccount,
  Reset,
  Songs,
  SongEdit,
  Users,
  Albums,
  AlbumEdit,
} from "./pages";

const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path={"/login"} component={Login} />
      <Route exact path={"/reset"} component={Reset} />

      <Auth>
        <Route exact path={"(/)?"} component={Home} />

        {/* Users */}
        <Route exact path={"/users"} component={Users} />
        <Route exact path={"/users/create"} component={CreateAccount} />

        {/* Albums */}
        <Route exact path={"/albums"} component={Albums} />
        <Route path={"/albums/edit/:id"} component={AlbumEdit} />

        {/* Songs */}
        <Route
          path={`/albums/detail/:albumId/edit/:songId`}
          component={SongEdit}
        />
        <Route exact path={`/albums/detail/:albumId`} component={Songs} />
      </Auth>
    </Switch>
  );
};

export default Routes;
