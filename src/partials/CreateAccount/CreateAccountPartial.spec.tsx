import { render, screen } from "@testing-library/react";
// import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CreateAccountPartial } from ".";
import { CreateAccountInputs } from "../../lib/schemas/createUserSchema";

if (process.env.NODE_ENV === "test") {
  const user = userEvent.setup();

  const buckButtonMockFn = jest.fn();
  const submitButtonMockFn = jest.fn();

  afterEach(() => {
    submitButtonMockFn.mockClear();
  });
  const setup = async (injectValues?: Partial<CreateAccountInputs>) => {
    render(
      <CreateAccountPartial
        handleClickBackButton={buckButtonMockFn}
        onSubmit={submitButtonMockFn}
      />
    );

    const input: CreateAccountInputs = {
      username: "アリス",
      email: "alice@example.com",
      password: "asdf1234",
      confirmPassword: "asdf1234",
      roleType: "editor",
      ...injectValues,
    };

    const username = screen.getByRole("textbox", { name: "お名前" });
    const email = screen.getByRole("textbox", { name: "E-mail" });

    const password = screen.getByPlaceholderText("8文字以上で入力");
    const confirmPassword =
      screen.getByPlaceholderText("8文字以上で入力(確認)");

    await user.type(username, input.username);
    await user.type(email, input.email);
    await user.type(password, input.password);
    await user.type(confirmPassword, input.confirmPassword);

    const clickSubmitButton = async () => {
      const submitButton = screen.getByRole("button", { name: "登録する" });

      await user.click(submitButton);
    };

    return { clickSubmitButton };
  };

  describe("invalid inputs", () => {
    test("何も入力されていない場合、ボタンは非活性である", async () => {
      //
    });

    test.skip("メールアドレス入力欄にメールアドレス以外の値が入力された場合、エラーメッセージを表示する", async () => {
      //
    });
    test.skip("パスワード入力欄に全角文字が入力された場合、エラーメッセージを表示する", async () => {
      //
    });
    test.skip("パスワード(確認)入力欄に全角文字が入力された場合、エラーメッセージを表示する", async () => {
      //
    });

    test.skip("パスワード入力欄に7文字しか入力されなかった場合、エラーメッセージを表示する", async () => {
      //
    });
    test.skip("パスワード入力欄に65文字入力された場合、エラーメッセージを表示する", async () => {
      //
    });
    test.skip("パスワード(確認)入力欄に7文字しか入力されなかった場合、エラーメッセージを表示する", async () => {
      //
    });
    test.skip("パスワード(確認)入力欄に65文字入力された場合、エラーメッセージを表示する", async () => {
      //
    });

    test.skip("パスワードとパスワード(確認)が一致しない場合、エラーメッセージを表示する", async () => {
      //
    });

    test.skip.each([
      { name: "" },
      { email: "" },
      { password: "" },
      { confirmPassword: "" },
    ])(
      "なにか一つでも未入力の欄がある場合、エラーメッセージを表示する",
      async (_arg) => {
        //
      }
    );
  });

  describe("valid inputs", () => {
    test("すべての入力欄が正常な値で入力された場合、ボタンをクリックする事ができる", async () => {
      const { clickSubmitButton } = await setup();

      await clickSubmitButton();

      expect(await submitButtonMockFn).toHaveBeenCalledTimes(1);
    });
  });
}
