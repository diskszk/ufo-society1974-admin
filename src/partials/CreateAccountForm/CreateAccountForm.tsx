import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { Textbox } from "../../components/Textbox";
import { StyledButton } from "../../components/UIKit/CustomButton";
import { ROLE } from "../../constants";
import {
  CreateAccountInputs,
  createUserSchema,
} from "../../lib/schemas/createUserSchema";
import { Select } from "../../components/Select";
import { SelectOptions } from "../../lib/types";

const roles: SelectOptions = [
  {
    value: ROLE.EDITOR,
    label: ROLE.EDITOR,
  },
  {
    value: ROLE.MASTER,
    label: ROLE.MASTER,
  },
  {
    value: ROLE.WATCHER,
    label: ROLE.WATCHER,
  },
];

type Props = {
  handleClickBackButton: () => void;
  onSubmit: SubmitHandler<CreateAccountInputs>;
};

export const CreateAccountForm: React.FC<Props> = ({
  handleClickBackButton,
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CreateAccountInputs>({
    resolver: zodResolver(createUserSchema),
    mode: "onBlur",
    defaultValues: {
      roleType: ROLE.EDITOR,
    },
  });

  return (
    <div className="inputs-container">
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Textbox
          {...register("username")}
          label={"お名前"}
          type={"text"}
          required
          error={!!errors?.username}
          helperText={errors?.username?.message}
          aria-invalid={Boolean(errors?.username)}
        />
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
        <Textbox
          {...register("confirmPassword")}
          label={"パスワード(確認)"}
          type={"password"}
          required
          placeholder="8文字以上で入力(確認)"
          error={!!errors?.confirmPassword}
          helperText={errors?.confirmPassword?.message}
          aria-invalid={Boolean(errors?.confirmPassword)}
        />

        <Controller
          name="roleType"
          control={control}
          render={({ field }) => <Select options={roles} {...field} />}
        />

        <div className="button-container-row">
          <StyledButton onClick={handleClickBackButton}>もどる</StyledButton>
          <StyledButton disabled={isSubmitting || !isDirty} type="submit">
            登録する
          </StyledButton>
        </div>
      </form>
    </div>
  );
};
