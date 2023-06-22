import z from "zod";

/* 
  passwordの要件はNIST SP800-63B Digital Identity Guidelinesから
 */
export const createUserSchema = z
  .object({
    username: z.string().min(1, "名前は必ず入力してください。"),
    email: z
      .string()
      .min(1, { message: "メールアドレスは必ず入力してください。" })
      .email({ message: "不正なメールアドレス形式です。" }),
    password: z
      .string()
      .min(8, { message: "パスワードは8文字以上で入力してください。" })
      .max(64, { message: "パスワードは64文字以下で入力してください。" })
      .regex(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i, {
        message: '"パスワードは半角英数字混合で入力してください。"',
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "パスワードは8文字以上で入力してください。" })
      .max(64, { message: "パスワードは64文字以下で入力してください。" })
      .regex(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i, {
        message: '"パスワードは半角英数字混合で入力してください。"',
      }),
    roleType: z.string(),
  })
  .required()
  .strict()
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "パスワードが一致しません。",
      });
    }
  });

export type CreateUserInputs = z.infer<typeof createUserSchema>;
