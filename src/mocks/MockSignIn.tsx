import { useSignIn } from "../hooks/useSignIn";

export const MockSignIn: React.FC = () => {
  const pw = "asdf1234";
  const { handleSignIn } = useSignIn();

  const handleClick = async (email: string) => {
    await handleSignIn(email, pw);
  };

  return (
    <div>
      <ul>
        <li>
          editor
          <button onClick={() => handleClick("editor@example.com")}>
            signIn
          </button>
        </li>
        <li>
          master
          <button onClick={() => handleClick("master@example.com")}>
            signIn
          </button>
        </li>
        <li>
          watcher
          <button onClick={() => handleClick("watcher@example.com")}>
            signIn
          </button>
        </li>
      </ul>
    </div>
  );
};
