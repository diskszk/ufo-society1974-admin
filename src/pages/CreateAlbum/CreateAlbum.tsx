import { SubmitHandler } from "react-hook-form";
import { AlbumInput } from "../../lib/schemas/albumSchema";
import { AlbumForm } from "../../partials/AlbumForm";
import { ROLE } from "../../constants";
import { useSignedInUserState } from "../../hooks/useSignedInUserState";
import { useMessageModalState } from "../../hooks/useMessageModalState";
import { useCreateAlbum } from "../../hooks/useCreateAlbum";

// /albums/create
export const CreateAlbum: React.FC = () => {
  const { handleCreateAlbum } = useCreateAlbum();
  const { signedInUser } = useSignedInUserState();

  const { openMessageModalWithMessage } = useMessageModalState();

  const onSubmit: SubmitHandler<AlbumInput> = async (data) => {
    if (signedInUser.role !== ROLE.EDITOR) {
      openMessageModalWithMessage("権限がありません。");
    }

    await handleCreateAlbum(data);

    return;
  };

  return (
    <div className="album-edit">
      <h1>アルバムを追加・編集</h1>
      <AlbumForm
        backToHref="/albums"
        onSubmit={onSubmit}
        role={signedInUser.role}
      />
    </div>
  );
};
