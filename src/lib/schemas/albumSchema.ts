import z from "zod";

export const albumSchema = z
  .object({
    title: z
      .string()
      .min(1, { message: "アルバムタイトルは必ず入力してください。" })
      .max(255, {
        message: `
  アルバムタイトルが長すぎて入力を受け入れられません。
  アルバムタイトルは225文字以内で入力してください。
  `,
      }),
    publishedDate: z
      .string()
      .regex(
        /^\d{4}-?\d{2}-?\d{2}$/g,
        "公開日はYYYY-MM-DDの形式で入力してください。"
      ),
    imageFile: z.instanceof(FileList),
  })
  .required()
  .strict();

export type AlbumInput = z.infer<typeof albumSchema>;
