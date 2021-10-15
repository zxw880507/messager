import { useAppDispatch, useAppSelector } from "../store/hooks";
import { authenState, getUser } from "../store/features/auth/authSlice";
import { useEffect } from "react";

export default function useAuth() {
  const authen = useAppSelector(authenState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authen.status === "idle") {
      dispatch(getUser());
    }
  }, [dispatch, authen]);

  return authen;
}
