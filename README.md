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
    `$ npm run start`

## コードの概要
  - 友人が参加しているバンド「UFO Society」が制作したWebページの管理機能を持つWebアプリケーション
  - Firebaseが提供するAuthentication/Firestoreを用いてユーザーの登録・管理の機能を実装した
  - Firebaseが提供するFirestoreを用いて、管理画面からDBにコンテンツを追加し、元のWebサイトから閲覧できるよう実装した

## アプリケーション作成のきっかけ
  - 元々のWebページに追加で「曲ごとの歌詞を表示したい」、「楽曲をWebページ上から聴ける機能が欲しい」との要望と、Webページの開発者が諸事情によりWebページの運用が難しくなっとことを受け、バンドのメンバーがWebブラウザ上からコンテンツを追加・削除・編集できるようにする為のアプリケーションを作成した
