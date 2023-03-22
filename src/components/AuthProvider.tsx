import { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "../app/hooks";
import { signin, signout } from "../features/user/userSlice";
import { useTokenQuery } from "../features/user/services";
import useAuth from "../features/user/useAuth";

function AuthProvider({ children }: { children: JSX.Element }) {
  const dispatch = useAppDispatch();
  const token = useRef<string>("");
  const expiresAt = useRef<number>(0);
  const [skip, setSkip] = useState(true);
  const { data, isSuccess, isError } = useTokenQuery(token.current, {
    skip,
  });
  const { isSignedIn } = useAuth();

  useEffect(() => {
    // Get token and expiresAt from local storage.
    const localToken = localStorage.getItem("token");
    const localExpiresAt = Number(localStorage.getItem("expiresAt") || 0);

    if (localToken && localExpiresAt > Date.now()) {
      token.current = localToken;
      expiresAt.current = localExpiresAt;
    } else {
      dispatch(signout());
    }
  }, []);

  useEffect(() => {
    if (token.current) setSkip(false); // Read user data by token.
  }, [token.current]);

  useEffect(() => {
    if (isSuccess && data?.user) {
      dispatch(
        signin({
          user: data.user,
          token: token.current,
          expiresAt: expiresAt.current,
        })
      );
    }
    if (isError) {
      dispatch(signout());
    }
  }, [data?.user, isSuccess, isError]);

  if (isSignedIn === null) return <>Loading</>;

  return <>{children}</>;
}

export default AuthProvider;
