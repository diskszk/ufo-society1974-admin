// variables
export const ROLE = {
  MASTER: "master",
  EDITOR: "editor",
  WATCHER: "watcher",
} as const;

export { default as NO_IMAGE } from "./assets/images/no_image.jpg";

export const UFO_SOCIETY_OFFICIAL =
  "https://ufo-society-1974.web.app/" as const;

export const WEB_API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_BASE_URL
    : process.env.REACT_APP_API_DEV_URL;
