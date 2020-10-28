export const changeRoleName = (role: string) => {
  switch (role) {
    case "master":
      return "ユーザー管理者"
    case "editer":
      return "編集者";
    case "test":
      return "テスト";
    default:
      return "?????";
  }
}