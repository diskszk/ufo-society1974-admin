import z from "zod";

export const signInSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "メールアドレスは必ず入力してください。" })
      .email({ message: "不正なメールアドレス形式です。" }),
    password: z
      .string()
      .min(1, { message: "パスワードは必ず入力してください。" }),
  })
  .required()
  .strict();

export type SignInInputs = z.infer<typeof signInSchema>;
