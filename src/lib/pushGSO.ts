import { db } from '../firebase';
import { GSOdatas } from './GSOdata';
import { saveSong } from './songs';
import { Song } from './types';

export const pushGSO = async () => {
  const albumId = 'YntSWesVGSVClbsz';

  const songRef = db.collection('albums').doc(albumId).collection('songs');
  GSOdatas.map(async (GSOdata: Song) => {
    songRef.doc(GSOdata.id).set(GSOdata, { merge: true });
  });
};
