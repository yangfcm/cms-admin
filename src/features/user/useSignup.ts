import { useCallback, useMemo } from "react";
import { useAppDispatch } from "../../app/hooks";
import parseError from "../../utils/parseError";
import { useSignupMutation } from "./services";
import { SignUpUser } from "./types";
import { signin as signinAction, signout as signoutAction } from "./userSlice";

function useSignup() {
  const dispatch = useAppDispatch();
  const [signupMutation, { isError, isLoading, isSuccess, error: signupError }] = useSignupMutation();

  const error = useMemo(() => {
    if (!signupError) return '';
    return parseError(signupError);
  }, [signupError]);

  const signup = useCallback(async (signupUser: SignUpUser) => {
    try {
      const { user, token, expiresAt } = await signupMutation(signupUser).unwrap();
      localStorage.setItem("token", token);
      localStorage.setItem("expiresAt", expiresAt.toString());
      dispatch(signinAction({ user, token, expiresAt }));
    } catch (err: any) {
      dispatch(signoutAction());
    }
  }, [dispatch, signupMutation]);

  return { signup, isError, isLoading, isSuccess, error };
}

export default useSignup;