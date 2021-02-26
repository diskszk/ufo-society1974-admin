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
    - リポジトリをクローンしてください  
    `$ git clone https://github.com/diskszk/ufo-society1974-admin.git`  
    - 作業ディレクトリに移動してください  
    `$ cd ufo-society1974-admin`
    - 必要なライブラリをインストールしてください  
    `$ npm install`
    - ローカル環境に.envファイルを作成し下記コードを貼り付け、それぞれの右辺にfirebaseより取得した値を入力してください  
    `$ touch .env`  
      ```
      REACT_APP_FIREBASE_KEY=
      REACT_APP_FIREBASE_APP_ID=
      REACT_APP_FIREBASE_MEASUREMENT_ID=
      ```
    - デベロップサーバーを起動してください  
    `$ npm run start`

## コードの概要
  - 友人が参加しているバンド「UFO Society」が制作したWebページの管理機能を持つWebアプリケーション
  - Firebaseが提供するAuthentication/Firestoreを用いてユーザーの登録・管理の機能を実装した
  - Firebaseが提供するFirestoreを用いて、管理画面からDBにコンテンツを追加し、元のWebサイトから閲覧できるよう実装した

## アプリケーション作成のきっかけ
  - 元々のWebページに追加で「曲ごとの歌詞を表示したい」、「楽曲をWebページ上から聴ける機能が欲しい」との要望と、Webページの開発者が諸事情によりWebページの運用が難しくなっとことを受け、バンドのメンバーがWebブラウザ上からコンテンツを追加・削除・編集できるようにする為のアプリケーションを作成した
