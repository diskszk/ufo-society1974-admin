import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Textbox } from "../../components/Textbox";
import { StyledButton } from "../../components/UIKit/CustomButton";

const schema = z
  .object({
    email: z
      .string()
      .min(1, { message: "メールアドレスは必ず入力してください。" })
      .email({ message: "不正なメールアドレス形式です。" }),
  })
  .strict();

export type Inputs = z.infer<typeof schema>;

type Props = {
  onSubmit: SubmitHandler<Inputs>;
};

export const ResetForm: React.FC<Props> = ({ onSubmit }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty, isSubmitSuccessful, isSubmitting },
  } = useForm<Inputs>({ resolver: zodResolver(schema), mode: "onBlur" });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="inputs-container">
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Textbox
          {...register("email")}
          label={"E-mail"}
          type="email"
          required
          error={!!errors?.email}
          helperText={errors?.email?.message}
          aria-invalid={errors?.email ? true : false}
        />
        <div className="button-container">
          <StyledButton disabled={isSubmitting || !isDirty} type="submit">
            リセット
          </StyledButton>
        </div>
      </form>
    </div>
  );
};
