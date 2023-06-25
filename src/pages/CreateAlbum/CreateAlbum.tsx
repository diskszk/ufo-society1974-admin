import { SubmitHandler } from "react-hook-form";
import { AlbumInput } from "../../lib/schemas/albumSchema";
import { AlbumForm } from "../../partials/AlbumForm";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";

// /albums/create
export const CreateAlbum: React.FC = () => {
  const history = useHistory();

  const handleBack = useCallback(() => {
    history.goBack();
    return;
  }, [history]);

  const onSubmit: SubmitHandler<AlbumInput> = (data) => {
    console.log(data);
    return;
  };

  return (
    <div className="album-edit">
      <h1>アルバムを追加・編集</h1>
      <AlbumForm handleBack={handleBack} onSubmit={onSubmit} role="editor" />
    </div>
  );
};
