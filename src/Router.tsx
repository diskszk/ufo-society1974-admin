import { Routes, Route } from "react-router-dom";
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

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path={"/login"} element={<Login />} />
      <Route path={"/reset"} element={<Reset />} />

      {/* <Auth> */}
      {/* <Route path={"(/)?"} element={<Home />} /> */}

      {/* Users */}
      <Route path={"/users"} element={<Users />} />
      <Route path={"/users/create"} element={<CreateAccount />} />

      {/* Albums */}
      <Route path={"/albums"} element={<Albums />} />
      <Route path={"/albums/edit/:id"} element={<AlbumEdit />} />

      {/* Songs */}
      <Route
        path={`/albums/detail/:albumId/edit/:songId`}
        element={<SongEdit />}
      />
      <Route path={`/albums/detail/:albumId`} element={<Songs />} />
      {/* </Auth> */}
    </Routes>
  );
};

export default Router;
