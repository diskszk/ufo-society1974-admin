import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "../lib/types";
import { Dispatch, SetStateAction } from "react";

const SIGNED_IN_USER = "signedInUser";

const initialUserState: User = {
  uid: "",
  email: "",
  role: "",
  username: "",
  isDeleted: false,
};

export function useSignedInUserState(): {
  signedInUser: User;
  setSignedInUser: Dispatch<SetStateAction<User>>;
  setSignOut: () => void;
} {
  const signedInUser = useQuery<User>([SIGNED_IN_USER], {
    enabled: false,
    initialData: initialUserState,
  }).data;

  const queryClient = useQueryClient();

  const setSignedInUser = (arg: ((arg: User) => void) | User): void => {
    let newValue;

    if (typeof arg === "function") {
      const prevValue = queryClient.getQueryData<User>([SIGNED_IN_USER]);

      newValue = (arg as any)(prevValue);
    } else {
      newValue = arg;
    }

    queryClient.setQueryData<User>([SIGNED_IN_USER], newValue);
  };

  const setSignOut = (): void => {
    queryClient.setQueriesData<User>([SIGNED_IN_USER], initialUserState);
  };

  return { signedInUser, setSignedInUser, setSignOut };
}
