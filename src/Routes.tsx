import { Switch, Route } from "react-router-dom";
import Auth from "./Auth";
import {
  Home,
  SignIn,
  CreateUser,
  Reset,
  Songs,
  SongEdit,
  Users,
  Albums,
  AlbumEdit,
  CreateAlbum,
} from "./pages";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/reset"} component={Reset} />

      <Auth>
        <Route exact path={"(/)?"} component={Home} />

        {/* Users */}
        <Route exact path={"/users"} component={Users} />
        <Route exact path={"/users/create"} component={CreateUser} />

        {/* Albums */}
        <Route exact path={"/albums"} component={Albums} />
        <Route path={"/albums/edit/:id"} component={AlbumEdit} />
        {/* TODO: componentを設定する */}
        <Route path={"/albums/create"} component={CreateAlbum} />

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
