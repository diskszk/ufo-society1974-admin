import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootStore, User } from "../types";

export function useRedirectWithinSignedIn() {
  const navigate = useNavigate();

  const user = useSelector<RootStore, User>((state) => state.user);

  useEffect(() => {
    if (!user.isSignedIn) {
      navigate("/login");
    }
  }, [navigate, user]);
}
