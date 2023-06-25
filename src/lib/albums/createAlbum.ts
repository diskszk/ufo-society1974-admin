import axios from "axios";
import { WEB_API_BASE_URL } from "../../constants";

const baseUrl = (path: string) => {
  return WEB_API_BASE_URL + path;
};

type ImageFile = {
  filename: string;
  path: string;
};

export type CreateAlbumDTO = {
  publishedDate: string;
  title: string;
  imageFile: ImageFile;
};

export type UpdateAlbumDTO = {
  id: string;
  publishedDate: string;
  title: string;
  imageFile: ImageFile;
};

export async function createAlbum(album: CreateAlbumDTO) {
  try {
    await axios.post(baseUrl("/draft-albums"), {
      album,
    });
  } catch {
    throw new Error("アルバムの作成に失敗しました。");
  }
}

export async function updateAlbum(album: UpdateAlbumDTO) {
  try {
    const res = await axios.put(baseUrl(`/draft-albums/${album.id}`), album);

    if (res.status == 400) {
      throw new Error("該当するアルバムが存在しません。");
    }
  } catch {
    throw new Error("アルバムの更新に失敗しました。");
  }
}

export async function uploadImageFile(
  formData: FormData,
  filename: string
): Promise<ImageFile> {
  try {
    const res = await axios.post<ImageFile>(
      baseUrl(`/draft-albums/images/${filename}`),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  } catch {
    throw new Error("画像ファイルの保存に失敗しました。");
  }
}
