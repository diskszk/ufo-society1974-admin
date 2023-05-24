import { Album, Song, User } from "./../lib/types";
import altImage from "../assets/images/no_image.jpg";

const lyric = {
  kite: `ちゃちな指輪で 夢を見せるように
さみしい公園で描いた迷路

きみには愛が きみには風景が
ガラス瓶の中に ずっと
影を落としている

ビー玉あそびを
町が透けるまで
そうだ
きみは何か思うのに

音も無く
機体はきみの空を覆う
明滅に向かうように
空をのぼったら

着地しないはずの
目盛りだらけの月
きみの手で 白い手で
空をこじあけて`,
};

export const mockSongs: Song[] = [
  {
    id: "1",
    lyric: lyric.kite,
    songFile: {
      filename: "",
      path: "",
    },
    story: "",
    title: "ソングタイトル01",
    wordsRights: "XXX XXX",
    musicRights: "YYY YYY",
  },
  {
    id: "2",
    lyric: lyric.kite,
    songFile: {
      filename: "",
      path: "",
    },
    story: "",
    title: "ソングタイトル02",
    wordsRights: "XXX XXX",
    musicRights: "YYY YYY",
  },
  {
    id: "3",
    lyric: lyric.kite,
    songFile: {
      filename: "",
      path: "",
    },
    story: "",
    title: "ソングタイトル03",
    wordsRights: "XXX XXX",
    musicRights: "YYY YYY",
  },
];

export const mockAlbum: Album = {
  id: "album-id-01",
  imageFile: {
    path: altImage,
    filename: "no_image",
  },
  publishedDate: "1995-02-03",
  title: "テストアルバムタイトル01",
  description: "説明XXXXXXXXX",
  songs: mockSongs,
  publishPlatform: {
    AppleMusic: "",
    Spotify: "",
    iTunes: "",
    Bandcamp: "",
  },
};

export const mockUsers: User[] = [
  {
    isSignedIn: false,
    uid: "uid001",
    username: "テストユーザー1",
    role: "editor",
  },
  {
    isSignedIn: false,
    uid: "uid002",
    username: "テストユーザー2",
    role: "watcher",
  },
  {
    isSignedIn: false,
    uid: "uid003",
    username: "テストユーザー3",
    role: "master",
  },
];
