# UFO Society公式ホームページの管理アプリ

## 環境構築方法
  - 言語のバージョン
    - node: 12.X
  - 主要ライブラリのバージョン
    - react-scripts: 3.X
    - react: 16.X
    - redux: 4.X
    - TypeScript: 3.7.2
    - firebase: 7.X

  - インストール方法  
    1. リポジトリをクローン  
    `$ git clone https://github.com/diskszk/ufo-society1974-admin.git`  
    1. 作業ディレクトリに移動  
    `$ cd ufo-society1974-admin`
    1. 必要なライブラリをインストール  
    `$ npm install`
    1. デベロップサーバーを起動  
    `$ npm start`
  
  - デプロイ方法
    - プログラムをビルドする  
    `$ npm run build`
    - Firebase hostingにデプロイ  
    `$ firebase deploy --only hosting:ufo-society-admin`

## コードの概要
  - 日本のバンド「UFO Society」が制作したWebページの管理機能を持つWebアプリケーション。
  - Firebaseが提供するAuthentication/Firestoreを用いてユーザーの登録・管理の機能を実装した。
  - Firebaseが提供するFirestoreを用いて、管理画面からDBにコンテンツを追加し、元のWebサイトから閲覧できるよう実装した。

## 
deploy
firebase deploy --only hosting:ufo-society-admin