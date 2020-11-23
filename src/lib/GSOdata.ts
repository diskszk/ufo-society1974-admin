import { FirebaseTimestamp } from '../firebase';
import { Song } from './types';
const timestamp = FirebaseTimestamp.now();

export const GSOdatas: Song[] = [
  // ここから
  {
    created_at: timestamp,
    id: '0001', // 00XXの形で
    lyric: `ちゃちな指輪で 夢を見せるように
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
      空をこじあけて
    `,
    songFile: {
      filename: '', // 空欄
      path: '', // 空欄
    },
    story: 'TR-3B, Masuo TV, "レストー夫人"',
    title: 'カイト',
  },
  // ここまでコピー
  // ここから
  {
    created_at: timestamp,
    id: '0002', // 00XXの形で
    lyric: `わかいおまえが
    そんなに多くを知っているとは思えない
    そのささやかな出口を通るものは何だと言う
    
    ガラス瓶がほしい
    青い水がほしい
    おまえはそこに立ち 許せばいい
    
    そのささやかな出口を通り
    銃弾のように駆けぬけていく
    
    曇り空がほしい
    ドブの川がほしい
    おまえはそこに立ち 許せばいい
    
    かなしいことかい
    `,
    songFile: {
      filename: '', // 空欄
      path: '', // 空欄
    },
    story: '谷川俊太郎',
    title: 'ヤング',
  },
  // ここまでコピー
];
