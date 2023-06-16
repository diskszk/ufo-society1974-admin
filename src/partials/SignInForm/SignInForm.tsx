import React from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { StyledButton } from "../../components/UIKit/CustomButton";
import { Textbox } from "../../components/Textbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInInputs } from "../../lib/schemas/signInSchema";

type Props = {
  onSubmit: SubmitHandler<SignInInputs>;
};

export const SignInForm: React.FC<Props> = ({ onSubmit }) => {
  const {
    handleSubmit,
    register,
    formState: { isDirty, errors, isSubmitting },
  } = useForm<SignInInputs>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
  });

  return (
    <div className="inputs-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Textbox
          {...register("email")}
          label={"E-mail"}
          type={"email"}
          required
          error={!!errors?.email}
          helperText={errors?.email?.message}
          aria-invalid={Boolean(errors?.email)}
        />
        <Textbox
          {...register("password")}
          label={"パスワード"}
          type={"password"}
          required
          placeholder="8文字以上で入力"
          error={!!errors?.password}
          helperText={errors?.password?.message}
          aria-invalid={Boolean(errors?.password)}
        />

        <div className="spacing-div" />
        <div className="button-container">
          <StyledButton type="submit" disabled={isSubmitting || !isDirty}>
            サインイン
          </StyledButton>
        </div>
        <div className="spacing-div" />
      </form>

      <Link to="/reset">パスワードをリセットする</Link>
    </div>
  );
};
