import { Theme, SxProps } from "@mui/material";

// variables
export const ROLE = {
  MASTER: "master",
  EDITOR: "editor",
  WATCHER: "watcher",
} as const;

import defaultFile from "./assets/images/no_image.jpg";

export const NO_IMAGE = defaultFile;

export const UFO_SOCIETY_OFFICIAL =
  "https://ufo-society-1974.web.app/" as const;

export const textFieldSx: SxProps<Theme> = {
  margin: "1.5em 0",
  width: "80%",
} as const;

const WEB_API_PROD_URL =
  "https://asia-northeast2-ufo-society-1974.cloudfunctions.net/api";

const WEB_API_DEV_URL =
  "http://127.0.0.1:5001/ufo-society-1974/asia-northeast2/api";

export const WEB_API_BASE_URL =
  process.env.NODE_ENV === "production" ? WEB_API_PROD_URL : WEB_API_DEV_URL;

export const ERROR_MESSAGE = {
  serverError: "サーバーでエラーが発生しました。",
  notFound: (value: string) => `${value}が存在しません。`,
};
