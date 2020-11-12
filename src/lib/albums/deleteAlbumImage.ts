import { imagesRef } from '../../firebase'

export const deleteAlbumImage = async (filename: string) => {

  imagesRef.child(filename).delete()
    .then(() => {
      alert('画像が削除されました。')
    }).catch((e) => {
      console.error(e);
    })
}