import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useSigninMutation } from "./services";
import { SignInUser } from "./types";
import { signin as signinAction, signout as signoutAction } from './userSlice';

function useAuth() {
  const dispatch = useAppDispatch();
  const [signinMutation, { isError, isLoading, isSuccess, error }] = useSigninMutation();

  const isSignedIn = useSelector(({ user }: RootState) => {
    const isExpired = Date.now() > user.expiresAt;
    return user.authUser && user.token && !isExpired;
  });

  const signin = useCallback(async (signinUser: SignInUser) => {
    const { user, token, expiresAt } = await signinMutation(signinUser).unwrap();
    localStorage.setItem("token", token);
    dispatch(signinAction({ user, token, expiresAt }));
  }, [dispatch, signinMutation]);

  const signout = useCallback(() => {
    localStorage.removeItem("token");
    dispatch(signoutAction());
  }, [dispatch]);
  return { signin, signout, isError, isLoading, isSuccess, error, isSignedIn };

}

export default useAuth;